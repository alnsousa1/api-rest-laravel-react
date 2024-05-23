import React from "react";
import { Button, Table, Form } from "react-bootstrap";

class Devs extends React.Component {

    9
    constructor(props) {
        super(props);

        this.state = {
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
                            <tr>
                                <td>{dev.id}</td>
                                <td>{dev.name}</td>
                                <td>{dev.id_level}</td>
                                <td>Editar  <Button variant="danger" onClick={() => this.deletarDev(dev.id)}>Excluir</Button></td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        )
    }

    render() {
        return (
            <div>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>

                {this.renderTabela()}
            </div>
        )
    }


}

export default Devs;