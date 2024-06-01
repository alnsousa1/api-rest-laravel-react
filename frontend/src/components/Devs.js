import React from "react";
import { Button, Table, Form } from "react-bootstrap";

class Devs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            name: '',
            id_level: '',
            sexo: '',
            data_nascimento: '',
            idade: '',
            hobby: '',
            devs: [],
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
                this.setState({ levels: response.data }, () => {
                    this.buscarDev();
                });
            })
    }

    buscarDev = () => {
        fetch("http://127.0.0.1:8000/api/v1/devs")
            .then(response => response.json())
            .then(response => {
                const devs = response.data.map(dev => ({
                    ...dev,
                    level_name: this.findLevelName(dev.id_level)
                }));
                this.setState({ devs });
            })
    }

    findLevelName = (id) => {
        const level = this.state.levels.find(level => level.id === id);
        return level ? level.name : '';
    }

    deletarDev = (id) => {
        fetch("http://127.0.0.1:8000/api/v1/devs/" + id, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    this.buscarDev();
                }
            })
    }

    editarDev = (id) => {
        fetch("http://127.0.0.1:8000/api/v1/devs/" + id, { method: 'GET' })
            .then(response => response.json())
            .then(response => {
                this.setState({ 
                    id: response.data.id,
                    name: response.data.name,
                    id_level: response.data.id_level,
                    sexo: response.data.sexo,
                    data_nascimento: response.data.data_nascimento,
                    idade: response.data.idade,
                    hobby: response.data.hobby
                 });
            })
    }

    cadastrarDev = (dev) => {
        fetch("http://127.0.0.1:8000/api/v1/devs",
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dev)
            })
            .then(response => {
                if (response.ok) {
                    this.buscarDev();
                } else {
                    alert("Não foi possível adicionar o desenvolvedor!");
                }
            })
    }

    atualizarDev = (dev) => {
        fetch("http://127.0.0.1:8000/api/v1/devs/"+dev.id,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dev)
            })
            .then(response => {
                if (response.ok) {
                    this.buscarDev();
                } else {
                    alert("Não foi possível editar os dados do desenvolvedor!");
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
                                <td>{dev.level_name}</td>
                                <td>
                                    <Button variant="primary" onClick={() => this.editarDev(dev.id)}>Editar</Button>
                                    <Button variant="danger" onClick={() => this.deletarDev(dev.id)}>Excluir</Button>
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

        if(this.state.id == 0){
            const dev = {
                name: this.state.name,
                id_level: this.state.id_level,
                sexo: this.state.sexo,
                data_nascimento: this.state.data_nascimento,
                idade: this.state.idade,
                hobby: this.state.hobby
            }
    
            this.cadastrarDev(dev);
        }else{
            const dev = {
                id: this.state.id,
                name: this.state.name,
                id_level: this.state.id_level,
                sexo: this.state.sexo,
                data_nascimento: this.state.data_nascimento,
                idade: this.state.idade,
                hobby: this.state.hobby
            }
    
            this.atualizarDev(dev);
        }
    }
    reset = () => {
        this.setState({
            id: 0,
            name: '',
            id_level: '',
            sexo: '',
            data_nascimento: '',
            idade: '',
            hobby: ''
        })
    }

    render() {
        return (
            <div>
                <Form> 
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>ID:</Form.Label>
                        <Form.Control type="text" value={this.state.id} readOnly={true} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" required placeholder="Digite o nome: " value={this.state.name} onChange={this.updateField('name')} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Nível</Form.Label>
                        <Form.Select aria-label="Default select example" value={this.state.id_level} onChange={this.updateField('id_level')}>
                            <option>Selecione o nível</option>
                            {this.state.levels.map(level => (
                                <option key={level.id} value={level.id}>{level.name}</option>
                            ))}
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

                    <Button variant="primary" type="button" onClick={() => { this.submit() }}>
                        Cadastrar
                    </Button>
                    <Button variant="primary" type="button" onClick={() => { this.reset() }}>
                        Novo
                    </Button>
                </Form>

                {this.renderTabela()}
            </div>
        )
    }
}

export default Devs;
