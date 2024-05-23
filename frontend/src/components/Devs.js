import React from "react";
import { Button, Table, Form } from "react-bootstrap";

class Devs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            id_level: '',
            sexo: '',
            data_nascimento: '',
            idade: '',
            hobby: '',
            devs: []
        }
    }

    componentDidMount() {
        this.buscarDev();
    }

    buscarDev = () => {
        fetch("http://127.0.0.1:8000/api/v1/devs")
            .then(response => response.json())
            .then(response => {
                this.setState({ devs: response.data })
            })
    }

    deletarDev = (id) => {
        fetch("http://127.0.0.1:8000/api/v1/devs/" + id, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    this.buscarDev();
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
                        <th>Nível</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.devs.map((dev) =>
                            <tr key={dev.id}>
                                <td>{dev.id}</td>
                                <td>{dev.name}</td>
                                <td>{dev.id_level}</td>
                                <td>
                                    Editar  <Button variant="danger" onClick={() => this.deletarDev(dev.id)}>Excluir</Button>
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

    render() {
        return (
            <div>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" required placeholder="Digite o nome: " value={this.state.name} onChange={this.updateField('name')} />
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Nível</Form.Label>
                        <Form.Select aria-label="Default select example" value={this.state.id_level} onChange={this.updateField('id_level')}>
                            <option>Selecione o nível</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Sexo</Form.Label>
                        <Form.Select aria-label="Default select example" value={this.state.sexo} onChange={this.updateField('sexo')} required>
                            <option>Selecione o sexo</option>
                            <option value="M">Masculino</option>
                            <option value="F">Feminino</option>
                        </Form.Select>
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Nascimento</Form.Label>
                        <Form.Control type="date" value={this.state.data_nascimento} onChange={this.updateField('data_nascimento')} required />
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Idade</Form.Label>
                        <Form.Control type="number" required placeholder="Digite sua idade: " value={this.state.idade} onChange={this.updateField('idade')} />
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Hobby</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Nos conte seu hobby:" value={this.state.hobby} onChange={this.updateField('hobby')} />
                    </Form.Group>
                    
                    <Button variant="primary" type="submit">
                        Cadastrar
                    </Button>
                </Form>

                {this.renderTabela()}
            </div>
        )
    }
}

export default Devs;
