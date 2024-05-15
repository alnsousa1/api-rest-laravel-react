import React from "react";
import { Table } from "react-bootstrap";

class Devs extends React.Component {

    9
    constructor(props) {
        super(props);

        this.state = {
            devs: [
                { 'id': 1, 'nome': 'Allan Sousa', 'level': 'Júnior 1' },
                { 'id': 2, 'nome': 'André Luis', 'level': 'Pleno 3' },
                { 'id': 3, 'nome': 'André Luis', 'level': 'Pleno 3' },
                { 'id': 4, 'nome': 'André Luis', 'level': 'Pleno 3' },
                { 'id': 5, 'nome': 'André Luis', 'level': 'Pleno 3' },
            ]
        }
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
                                <td>{dev.nome}</td>
                                <td>{dev.level}</td>
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