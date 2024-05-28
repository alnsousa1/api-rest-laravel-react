import React from "react";
import { Button, Table, Form } from "react-bootstrap";

class Levels extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            levels: []
        }
    }

    componentDidMount() {
        this.buscarLevels();
    }

    buscarLevels = () => {
        fetch("http://127.0.0.1:8000/api/v1/levels")
            .then(response => response.json())
            .then(response => {
                const levels = response.data.map(level => ({
                    ...level
                }));
                this.setState({ levels });
            })
    }

    deletarLevel = (id) => {
        fetch("http://127.0.0.1:8000/api/v1/levels/" + id, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    this.buscarLevels();
                }
            })
    }

    cadastrarLevel = (level) => {
        fetch("http://127.0.0.1:8000/api/v1/levels",
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(level)
            })
            .then(response => {
                if (response.ok) {
                    this.buscarLevels();
                } else {
                    alert("Não foi possível cadastrar este nível!");
                }
            })
    }

    renderTabela() {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.levels.map((level) =>
                            <tr key={level.id}>
                                <td>{level.id}</td>
                                <td>{level.name}</td>
                                <td>
                                    Editar  <Button variant="danger" onClick={() => this.deletarLevel(level.id)}>Excluir</Button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        )
    }

    updateField = (field) => (e) => {
        this.setState({
            [field]: e.target.value
        });
    }

    submit() {
        const level = {
            name: this.state.name,
        }

        this.cadastrarLevel(level);
    }

    render() {
        return (
            <div>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Nome do nível</Form.Label>
                        <Form.Control type="text" required placeholder="Digite o nome: " value={this.state.name} onChange={this.updateField('name')} />
                    </Form.Group>

                    <Button variant="primary" type="button" onClick={() => {this.submit()}}>
                        Cadastrar
                    </Button>
                </Form>

                {this.renderTabela()}
            </div>
        )
    }
}

export default Levels;
