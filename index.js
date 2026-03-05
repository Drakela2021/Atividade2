import express from 'express';

const host = '0.0.0.0';
const porta = 3000;

const app = express();
app.use(express.urlencoded({extended: true}));
var listaClientes=[];

app.get('/', (req, res) => {
    res.send('"/cadastro" para acessar a página de cadastro do cliente.');
})

app.get('/cadastro', (req, res) => {
res.write(`
        <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <title>Cadastro de Cliente</title>

                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">

                <style>
                    body {
                        background: linear-gradient(135deg, #1e3c72, #6a11cb);
                        height: 100vh;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    .card-return {
                        background-color: #f8f9fa;
                        padding: 40px;
                        border-radius: 15px;
                        width: 360px;
                        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
                    }

                    .card-return h2 {
                        text-align: center;
                        margin-bottom: 30px;
                        font-weight: 600;
                        color: #1e3c72;
                    }

                    .form-control {
                        border-radius: 25px;
                        padding-left: 15px;
                    }

                    .form-control:focus {
                        border-color: #6a11cb;
                        box-shadow: 0 0 0 0.2rem rgba(106, 17, 203, 0.25);
                    }

                    .btn-submit {
                        border: none;
                        border-radius: 25px;
                        background: linear-gradient(90deg, #1e3c72, #6a11cb);
                        color: white;
                        font-weight: 500;
                        padding: 10px;
                        width: 100%;
                    }

                    .btn-submit:hover {
                        opacity: 0.9;
                    }

                    .btn-voltar {
                        border-radius: 25px;
                        width: 100%;
                        margin-top: 10px;
                        border: 2px solid #1e3c72;
                        color: #1e3c72;
                        font-weight: 500;
                    }

                    .btn-voltar:hover {
                        background: linear-gradient(90deg, #1e3c72, #6a11cb);
                        color: white;
                        border: none;
                    }
                </style>
            </head>

            <body>

            <div class="card-return">

                <h2>Cadastrar</h2>

                <form method="POST" action="/cadastro">
                    <div class="mb-3">
                        <label class="form-label" for="nome">Nome</label>
                        <input type="text" class="form-control" placeholder="Username" maxlength="30" id="nome" name="nome">
                    </div>

                    <div class="mb-3">
                        <label class="form-label" for="email">Email</label>
                        <input type="email" class="form-control" placeholder="Email" maxlength="30" id="email" name="email">
                    </div>

                    <div class="mb-3">
                        <label class="form-label" for="senha">Senha</label>
                        <input type="password" class="form-control" placeholder="Password" maxlength="30" id="senha" name="senha">
                    </div>

                    <div class="mb-3">
                        <label class="form-label" for="confirmasenha">Confirme a senha</label>
                        <input type="password" class="form-control" placeholder="Confirme a senha" maxlength="30" id="confirmasenha" name="confirmasenha">
                    </div>
                    <button type="submit" class="btn-submit">Cadastrar</button>

                    <button type="button" 
                            class="btn btn-voltar" 
                            onclick="history.back()">
                        Voltar
                    </button>
                </form>

            </div>

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>

            </body>
            </html>
    `);
    res.end();
})

app.post("/cadastro", (req, res) => {
    const nome=req.body.nome
    const email=req.body.email
    const senha=req.body.senha
    const confirmasenha=req.body.confirmasenha

    if(nome==""|| email==""|| senha== "")
    {
        res.send(`<script>alert("Preencha os todos os campos devidamente!")
                    window.location.href="/cadastro"
                </script>
                `)
        return;
    }
    if(senha!==confirmasenha)
    {
        res.send(`<script>alert("As senhas estão diferentes!");
            window.location.href="/cadastro";
            </script>
        `)
        return;
    }

    listaClientes.push(
        {
            "nome": nome,
            "email": email,
            "senha": senha,
        }
    );

    res.redirect("/listaClientes");
    
});

app.get("/listaClientes", (req, res) => {

    res.write(`
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <title>Lista de Clientes</title>

        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">

        <style>
            body {
                background: linear-gradient(135deg, #1e3c72, #6a11cb);
                min-height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                font-family: Arial, sans-serif;
            }

            .card-return {
                width: 750px;
                padding: 40px;
                border-radius: 20px;
                background: white;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                animation: fadeIn 0.4s ease-in-out;
            }

            h2 {
                text-align: center;
                margin-bottom: 30px;
                color: #1e3c72;
                font-weight: bold;
            }

            table {
                border-radius: 15px;
                overflow: hidden;
            }

            thead {
                background: linear-gradient(90deg, #1e3c72, #6a11cb);
                color: white;
            }

            tbody tr:hover {
                background-color: #f1f1f1;
                transition: 0.2s;
            }

            .btn-return {
                margin-top: 20px;
                border-radius: 25px;
                background: linear-gradient(90deg, #1e3c72, #6a11cb);
                color: white;
                font-weight: 500;
                border: none;
                padding: 10px 20px;
                width: 100%;
            }

            .btn-return:hover {
                opacity: 0.9;
            }

            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
        </style>

    </head>

    <body>

        <div class="card-return">
            <h2>Clientes Cadastrados</h2>

            <div class="table-responsive">
                <table class="table table-striped table-hover text-center">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Senha</th>
                        </tr>
                    </thead>
                    <tbody>
    `);

    if (listaClientes.length === 0) {
        res.write(`
            <tr>
                <td colspan="3" class="text-muted">
                    Nenhum cliente cadastrado ainda.
                </td>
            </tr>
        `);
    } else {
        for (let i=0; i<listaClientes.length;i++) {
            const Cliente = listaClientes[i];
            res.write(`
                <tr>
                    <td>${Cliente.nome}</td>
                    <td>${Cliente.email}</td>
                    <td>${Cliente.senha}</td>
                </tr>
            `);
        }
    }

    res.write(`
                    </tbody>
                </table>
            </div>

            <a href="/cadastro" class="btn btn-return text-white">
                Novo Cadastro
            </a>

        </div>

    </body>
    </html>
    `);

    res.end();
});

app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`)
})