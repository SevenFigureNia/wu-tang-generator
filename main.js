// Create a Wu-Tang Clan name generator. Present the user with 5 survey questions and based on those answers randomly generate their name. The name doesn't have to be exact names, but Wu-Tang sounding-ish names. Ex: Childish Gambino (who actually got his name from a Wu-Tang name generator).
document.querySelector('button').addEventListener('click', givenName);

function givenName() {
    const questions = ['q1', 'q2', 'q3', 'q4', 'q5'];
    const answers = questions.map(function(question) {
        const picked = document.querySelector('input[name=" ' +  question + ' "]:checked');
        return picked ? picked.value : '';
    });

    if (answers.includes('')) {
        document.querySelector('#result').innerText = 'Please answer all questions';
        return;
    }

    const query = questions
        .map(function(question, index) {
            return question + '=' + answers[index];
        })
        .join('&');

    fetch('/api?' + query)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            document.querySelector('#result').innerText = 'Your Wu-Tang name is: ' + data.name;
        });
}
