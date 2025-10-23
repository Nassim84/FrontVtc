document.addEventListener("DOMContentLoaded", () => {
	const form = document.getElementById("devisForm");
	const submitBtn = document.getElementById("submitBtn");

	if (!form) return;

	function showToast(message, type = "success") {
		const container = document.getElementById("toast-container");
		const toast = document.createElement("div");
		toast.className = `toast ${type}`;
		toast.textContent = message;
		container.appendChild(toast);
		setTimeout(() => toast.remove(), 4000);
	}

	form.addEventListener("submit", async function (e) {
		e.preventDefault();

		const data = {
			Nom: form.nom.value,
			Email: form.email.value,
			Telephone: form.telephone.value,
			Depart: form.depart.value,
			Arrivee: form.arrivee.value,
			DateHeure: form.dateHeure.value,
			Message: form.message.value,
		};

		// ----------------------------
		// FRONTEND VALIDATION
		// ----------------------------
		// Email
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(data.Email)) {
			showToast("⚠️ Email invalide", "error");
			return;
		}

		// Téléphone (français ou international simple)
		const phoneRegex = /^(\+?\d{1,3}[- ]?)?\d{9,10}$/;
		if (!phoneRegex.test(data.Telephone)) {
			showToast("⚠️ Téléphone invalide", "error");
			return;
		}

		// Départ ≠ arrivée
		if (data.Depart.toLowerCase() === data.Arrivee.toLowerCase()) {
			showToast(
				"⚠️ Le départ et l'arrivée ne peuvent pas être identiques",
				"error"
			);
			return;
		}

		// Date dans le futur
		const now = new Date();
		const dateInput = new Date(data.DateHeure);
		if (dateInput <= now) {
			showToast("⚠️ La date doit être dans le futur", "error");
			return;
		}
		submitBtn.classList.add("loading");

		try {
			const res = await fetch("https://uber-iiia.onrender.com/api/devis", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			if (!res.ok) throw new Error("Erreur réseau");

			const result = await res.json();
			console.log("✅ Réponse backend:", result);

			showToast("✅ Votre demande de devis a bien été envoyée !");
			form.reset();
		} catch (err) {
			console.error("❌ Erreur envoi devis:", err);
			showToast(
				"❌ Une erreur est survenue lors de l’envoi du devis.",
				"error"
			);
		} finally {
			submitBtn.classList.remove("loading");
		}
	});
});
