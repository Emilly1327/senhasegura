document.addEventListener("DOMContentLoaded", function () {
 
    const passwordInput = document.getElementById("password");
    const generateBtn = document.getElementById("generateBtn");
    const copyBtn = document.getElementById("copyBtn");
    const lengthInput = document.getElementById("length");
    const uppercaseCheck = document.getElementById("uppercase");
    const lowercaseCheck = document.getElementById("lowercase");
    const numbersCheck = document.getElementById("numbers");
    const symbolsCheck = document.getElementById("symbols");
    const strengthFill = document.querySelector(".strength-fill");
 
    if (!passwordInput || !generateBtn) return;
 
    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";
 
    function getSecureRandomInt(max) {
        if (max <= 0) return 0;
        const array = new Uint32Array(1);
        window.crypto.getRandomValues(array);
        return array[0] % max;
    }
 
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = getSecureRandomInt(i + 1);
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
 
    function generatePassword() {
 
        let selectedSets = [];
 
        if (uppercaseCheck.checked) selectedSets.push(upperChars);
        if (lowercaseCheck.checked) selectedSets.push(lowerChars);
        if (numbersCheck.checked) selectedSets.push(numberChars);
        if (symbolsCheck.checked) selectedSets.push(symbolChars);
 
        if (selectedSets.length === 0) {
            alert("Selecione pelo menos uma opção!");
            return;
        }
 
        let length = parseInt(lengthInput.value, 10);
 
        if (isNaN(length) || length < selectedSets.length) {
            alert("O tamanho da senha é inválido.");
            return;
        }
 
        let passwordArray = [];
 
        // Garante pelo menos 1 caractere de cada tipo
        selectedSets.forEach(function (set) {
            passwordArray.push(set[getSecureRandomInt(set.length)]);
        });
 
        const allChars = selectedSets.join("");
 
        // Completa o restante
        for (let i = passwordArray.length; i < length; i++) {
            passwordArray.push(allChars[getSecureRandomInt(allChars.length)]);
        }
 
        shuffleArray(passwordArray);
 
        const finalPassword = passwordArray.join("");
        passwordInput.value = finalPassword;
 
        updateStrength(finalPassword);
    }
 
    function updateStrength(password) {
 
        if (!strengthFill) return;
 
        let strength = 0;
 
        if (password.length >= 8) strength += 20;
        if (password.length >= 12) strength += 20;
        if (password.length >= 16) strength += 20;
        if (/[A-Z]/.test(password)) strength += 10;
        if (/[a-z]/.test(password)) strength += 10;
        if (/[0-9]/.test(password)) strength += 10;
        if (/[^A-Za-z0-9]/.test(password)) strength += 10;
 
        if (strength > 100) strength = 100;
 
        strengthFill.style.width = strength + "%";
 
        if (strength < 40) {
            strengthFill.style.background = "red";
        } else if (strength < 70) {
            strengthFill.style.background = "orange";
        } else {
            strengthFill.style.background = "lime";
        }
    }
 
    if (copyBtn) {
        copyBtn.addEventListener("click", function () {
            if (!passwordInput.value) return;
 
            navigator.clipboard.writeText(passwordInput.value)
                .then(function () {
                    copyBtn.textContent = "Copiado!";
                    setTimeout(function () {
                        copyBtn.textContent = "Copiar";
                    }, 1500);
                })
                .catch(function () {
                    alert("Erro ao copiar.");
                });
        });
    }
 
    generateBtn.addEventListener("click", generatePassword);
 
});
 