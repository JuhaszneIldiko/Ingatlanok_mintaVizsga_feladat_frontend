import { useEffect, useState } from "react";
import { Table } from "semantic-ui-react";

import '../Ads.css'

export default function Ads() {
  const [ingatlan, setIngatlan] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/ingatlan")
      .then((res) => res.json())
      .then((data) => setIngatlan([...data]));
  }, []);

  return (
    <div className="ml-100">
      <h1 className="center">Ajánlataink</h1>
      <Table celled padded striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell className="center middle" >Kategória</Table.HeaderCell>
            <Table.HeaderCell className="center middle">Leírás</Table.HeaderCell>
            <Table.HeaderCell className="center middle">Hirdetés dátuma</Table.HeaderCell>
            <Table.HeaderCell className="center middle">Tehermentes</Table.HeaderCell>
            <Table.HeaderCell className="center middle">Fénykép</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {ingatlan.map((val, index) => (
            <Table.Row  key={index}>
              <Table.Cell className="center middle" verticalAlign='middle'>{val.kategoriaNev}</Table.Cell>
              <Table.Cell className="middle">{val.leiras}</Table.Cell>
              <Table.Cell className="center middle">{val.hirdetesDatuma}</Table.Cell>
              <Table.Cell className={`center middle ${val.tehermentes ? "text-success" : "text-danger"}`}>{val.tehermentes ? "Igen" : "Nem"}</Table.Cell>
              <Table.Cell className="center" verticalAlign='bottom'>
                <img src={val.kepUrl} alt={val.hirdetesDatuma} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
