
// Importar as dependências
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Configurar o motor de visualização EJS
app.set('view engine', 'ejs');

// Middleware para analisar corpos de solicitação
app.use(express.static('public'));

// Rota para abrir a página de login
app.get('/login', (req, res) => {
    // Verificar se há uma mensagem de erro na query string
    const errorMessage = req.query.error ? 'Credenciais inválidas! Tente novamente.' : null;
    res.render('login', { error: errorMessage });
});

// Simulação de um "banco de dados" de usuários
const users = [
    { id: 1, email: 'usuario1@example.com', password: 'senha1' },
    { id: 2, email: 'usuario2@example.com', password: 'senha2' },
    { id: 3, email: 'usuario3@example.com', password: 'senha3' }
];

// Rota para processar o envio dos dados de login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    // Verificar se o usuário existe no "banco de dados"
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        res.redirect('/login/success'); // Redirecionar para a página de sucesso
    } else {
        res.redirect('/login?error=true'); // Redirecionar de volta para a página de login com mensagem de erro
    }
});

// Rota para a página de sucesso do login
app.get('/login/success', (req, res) => {
    res.render('login-success');
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});


// Rota para abrir a página de registro de login
app.get('/register', (req, res) => {
    // Verificar se há uma mensagem de erro na query string
    const errorMessage = req.query.error ? 'Erro ao registrar usuário. Tente novamente.' : null;
    res.render('register', { error: errorMessage });
});

// Rota para processar o envio dos dados de registro
app.post('/register', (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    // Validar os campos obrigatórios
    if (!name || !email || !password || !confirmPassword) {
        return res.redirect('/register?error=Todos os campos são obrigatórios.');
    }
    // Validar o formato do e-mail
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        return res.redirect('/register?error=E-mail inválido. Tente novamente.');
    }
    // Verificar se a senha e a confirmação de senha são iguais
    if (password !== confirmPassword) {
        return res.redirect('/register?error=As senhas não coincidem. Tente novamente.');
    }
    // Cadastrar o usuário (simulado)
    // Aqui você pode adicionar a lógica para salvar os dados do usuário em um banco de dados
    // Neste exemplo, apenas exibiremos uma mensagem de sucesso
    res.send('Usuário registrado com sucesso!');
});

