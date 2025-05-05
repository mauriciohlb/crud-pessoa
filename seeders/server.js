const sequelize = require('./database');

sequelize.sync()
  .then(() => {
    console.log('Banco de dados sincronizado.');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar o banco de dados:', error);
  });

const app = express();
const port = 3001; // Escolha uma porta diferente da que o React usará (geralmente 3000)

app.use(bodyParser.json());
app.use(cors());

// Rota para criar uma nova pessoa (Create)
app.post('/pessoas', async (req, res) => {
  try {
    const novaPessoa = await Pessoa.create(req.body);
    res.status(201).json(novaPessoa);
  } catch (error) {
    console.error('Erro ao criar pessoa:', error);
    res.status(500).json({ error: 'Erro ao criar pessoa.' });
  }
});

// Rota para listar todas as pessoas (Read)
app.get('/pessoas', async (req, res) => {
  try {
    const pessoas = await Pessoa.findAll();
    res.json(pessoas);
  } catch (error) {
    console.error('Erro ao listar pessoas:', error);
    res.status(500).json({ error: 'Erro ao listar pessoas.' });
  }
});

// Rota para buscar uma pessoa por ID (Read)
app.get('/pessoas/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pessoa = await Pessoa.findByPk(id);
    if (pessoa) {
      res.json(pessoa);
    } else {
      res.status(404).json({ error: 'Pessoa não encontrada.' });
    }
  } catch (error) {
    console.error('Erro ao buscar pessoa:', error);
    res.status(500).json({ error: 'Erro ao buscar pessoa.' });
  }
});

// Rota para atualizar uma pessoa por ID (Update)
app.put('/pessoas/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await Pessoa.update(req.body, {
      where: { id },
    });
    if (updated) {
      const pessoaAtualizada = await Pessoa.findByPk(id);
      res.json(pessoaAtualizada);
    } else {
      res.status(404).json({ error: 'Pessoa não encontrada.' });
    }
  } catch (error) {
    console.error('Erro ao atualizar pessoa:', error);
    res.status(500).json({ error: 'Erro ao atualizar pessoa.' });
  }
});

// Rota para deletar uma pessoa por ID (Delete)
app.delete('/pessoas/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Pessoa.destroy({
      where: { id },
    });
    if (deleted) {
      res.status(204).send(); // Resposta sem conteúdo para indicar sucesso na deleção
    } else {
      res.status(404).json({ error: 'Pessoa não encontrada.' });
    }
  } catch (error) {
    console.error('Erro ao deletar pessoa:', error);
    res.status(500).json({ error: 'Erro ao deletar pessoa.' });
  }
});

// Inicie o servidor
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
});