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
        <tr>
          <td>1</td>
          <td>Allan Sousa</td>
          <td>Júnior 1</td>
          <td>Editar  Excluir</td>
        </tr>
        <tr>
          <td>1</td>
          <td>Allan Sousa</td>
          <td>Júnior 1</td>
          <td>Editar  Excluir</td>
        </tr>
      </tbody>
    </Table>
        )
    }


}

export default Devs;