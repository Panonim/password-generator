const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function generateRandomLetter() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    return letters.charAt(Math.floor(Math.random() * letters.length));
}

function generatePassword(length) {
    let password = '';
    for (let i = 0; i < length; i++) {
        password += generateRandomLetter();
    }
    return password;
}

function displayPassword(password, isFinal) {
    process.stdout.write('\x1b[H\x1b[2J'); // Clear the console
    process.stdout.write('\x1b[?25l'); // Hide cursor
    const terminalWidth = process.stdout.columns;
    const padding = ' '.repeat(Math.floor((terminalWidth - password.length) / 2));
    if (isFinal) {
        let finalPassword = '';
        for (let i = 0; i < password.length; i++) {
            finalPassword += '\x1b[92m' + password.charAt(i) + '\x1b[0m'; // Light green text for the final password
        }
        console.log(padding + finalPassword); // Print the final password with light green text and centered
        rl.question('', () => {
            rl.close(); // Close the readline interface when Enter is pressed
        });
    } else {
        process.stdout.write(padding + password); // Print the generated password centered
    }
}

function generateAndDisplayPassword(length, duration) {
    const startTime = Date.now();
    let password;

    const intervalId = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime >= duration) {
            clearInterval(intervalId); // Stop generating passwords after the specified duration
            displayPassword(password, true); // Display final password with light green text
        } else {
            password = generatePassword(length); // Generate random password
            displayPassword(password, false); // Display generated password
        }
    }, 80);
}

rl.question('Enter the length of the password:', (answer) => {
    const passwordLength = parseInt(answer);
    if (!isNaN(passwordLength)) {
        const duration = 1500; // Duration for generating passwords (in milliseconds)
        generateAndDisplayPassword(passwordLength, duration);
    } else {
        console.log('Invalid input. Please enter a valid number.');
        rl.close(); // Close the readline interface if input is invalid
    }
});
