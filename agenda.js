document.addEventListener("DOMContentLoaded", () => {
    const contactList = document.getElementById("contactList");
    const addContactForm = document.getElementById("addContactForm");

    // Función para obtener los contactos y mostrarlos
    function getContacts() {
        fetch("http://www.raydelto.org/agenda.php")
            .then(response => response.json())
            .then(data => {
                contactList.innerHTML = ''; // Limpiar la lista de contactos
                data.forEach(contact => {
                    const contactItem = document.createElement("div");
                    contactItem.classList.add("contact-item");
                    contactItem.innerHTML = `<strong>${contact.nombre} ${contact.apellido}</strong><br>Teléfono: ${contact.telefono}`;
                    contactList.appendChild(contactItem);
                });
            })
            .catch(error => {
                console.error("Error al obtener los contactos:", error);
            });
    }

    // Función para agregar un nuevo contacto
    addContactForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevenir el envío del formulario

        const nombre = document.getElementById("nombre").value;
        const apellido = document.getElementById("apellido").value;
        const telefono = document.getElementById("telefono").value;

        const newContact = {
            nombre: nombre,
            apellido: apellido,
            telefono: telefono
        };

        fetch("http://www.raydelto.org/agenda.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newContact)
        })
        .then(response => response.json())
        .then(data => {
            console.log("Contacto agregado:", data);
            addContactForm.reset(); // Limpiar el formulario
            getContacts(); // Actualizar la lista de contactos
        })
        .catch(error => {
            console.error("Error al agregar el contacto:", error);
        });
    });

    // Cargar la lista de contactos al inicio
    getContacts();
});
