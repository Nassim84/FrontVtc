document.addEventListener("DOMContentLoaded", () => {
	const form = document.getElementById("devisForm");

	if (!form) return;

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

		console.log("📤 Données envoyées au backend:", data);

		try {
			const res = await fetch("https://uber-iiia.onrender.com/api/devis", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (!res.ok) throw new Error("Erreur réseau");

			const result = await res.json();
			console.log("✅ Réponse backend:", result);
			alert("Votre demande de devis a bien été envoyée !");
			form.reset();
		} catch (err) {
			console.error("❌ Erreur envoi devis:", err);
			alert("Une erreur est survenue lors de l’envoi du devis.");
		}
	});
});
