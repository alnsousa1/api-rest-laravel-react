import React from "react";
import { Button, Table, Form, Modal } from "react-bootstrap";
import Swal from 'sweetalert2';

class Levels extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            levels: [],
            modalOpened: false
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
        Swal.fire({
            title: 'Você tem certeza?',
            text: "Você não poderá reverter isso!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, excluir!',
            cancelButtonText: 'Não, cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch("http://127.0.0.1:8000/api/v1/levels/" + id, { method: 'DELETE' })
                    .then(response => {
                        if (response.ok) {
                            Swal.fire(
                                'Excluído!',
                                'O desenvolvedor foi excluído.',
                                'success'
                            );
                            this.buscarLevels();
                        } else {
                            Swal.fire(
                                'Erro!',
                                'Houve um problema ao excluir o nível.',
                                'error'
                            );
                        }
                    })
                    .catch(error => {
                        Swal.fire(
                            'Erro!',
                            'Houve um problema ao excluir o nível.',
                            'error'
                        );
                    });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelado',
                    'O desenvolvedor está seguro :)',
                    'error'
                );
            }
        });

    };

    editarLevel = (id) => {
        fetch("http://127.0.0.1:8000/api/v1/levels/" + id, { method: 'GET' })
            .then(response => response.json())
            .then(response => {
                this.setState({
                    id: response.data.id,
                    name: response.data.name,
                });
                this.openModal();
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
                    Swal.fire({
                        title: "Sucesso!",
                        text: "O nível foi cadastrado com sucesso!",
                        icon: "success"
                    });
                    this.buscarLevels();
                } else {
                    alert("Não foi possível cadastrar este nível!");
                }
            })
    }

    atualizarLevel = (level) => {
        fetch("http://127.0.0.1:8000/api/v1/levels/" + level.id,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(level)
            })
            .then(response => {
                if (response.ok) {
                    Swal.fire({
                        title: "Sucesso!",
                        text: "Os dados foram atualizados com sucesso!",
                        icon: "success"
                    });
                    this.buscarLevels();
                } else {
                    alert("Não foi possível editar os dados deste nível!");
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
                        <th style={{ float: "right" }}>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.levels.map((level) =>
                            <tr key={level.id}>
                                <td>{level.id}</td>
                                <td>{level.name}</td>
                                <td>
                                    <Button style={{ float: "right" }} variant="primary" onClick={() => this.editarLevel(level.id)}>Editar</Button>
                                    <Button style={{ float: "right", marginRight: "10px" }} variant="danger" onClick={() => this.deletarLevel(level.id)}>Excluir</Button>
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

        if (this.state.id == 0) {
            const level = {
                name: this.state.name,
            }
            this.cadastrarLevel(level);
        } else {
            const level = {
                id: this.state.id,
                name: this.state.name
            }
            this.atualizarLevel(level);
        }
        this.handleClose();
    }

    reset = () => {
        this.setState({
            id: 0,
            name: ''
        })
        this.openModal();
    }

    handleClose = () => {
        this.setState({
            modalOpened: false
        })
    }

    openModal = () => {
        this.setState({
            modalOpened: true
        })
    }


    render() {
        return (
            <div className="container">
                <Modal show={this.state.modalOpened} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cadastro de Desenvolvedores</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Nome do nível</Form.Label>
                                <Form.Control type="text" required placeholder="Digite o nome: " value={this.state.name} onChange={this.updateField('name')} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Cancelar
                        </Button>
                        <Button variant="primary" type="button" onClick={() => { this.submit() }}>
                            Salvar
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div className="m-2">
                    <Button variant="primary" type="button" onClick={() => { this.reset() }}>
                        Novo
                    </Button>
                </div>

                {this.renderTabela()}
            </div>
        )
    }
}

export default Levels;
