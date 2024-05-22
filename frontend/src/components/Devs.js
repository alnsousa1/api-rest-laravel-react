import React from "react";
import { Table } from "react-bootstrap";

class Devs extends React.Component {

    9
    constructor(props) {
        super(props);

        this.state = {
            devs: []
        }
    }

    componentDidMount(){
        fetch("http://127.0.0.1:8000/api/v1/devs")
        .then(response => response.json())
        .then(response => {
            this.setState({ devs : response.data})
        })
    }

    render() {
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
                                <td>Editar  Excluir</td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        )
    }


}

export default Devs;