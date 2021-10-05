import React, { useState, useEffect } from "react";

import {
  Paper,
  Link,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Chip,
} from "@mui/material";
import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";

const capitalize = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export default function PokemonInfo(props) {
  const [data, setData] = useState([]);
  const [abilities, setAbilities] = useState([]);
  const [moves, setMoves] = useState([]);
  const [forms, setForms] = useState([]);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${props.location.state.id}`)
      .then((res) => res.json())
      .then((response) => {
        setData(response);
        const abilities = response.abilities.map((item) =>
          capitalize(item.ability.name)
        );
        const moves = response.moves.map((item) => capitalize(item.move.name));
        const forms = response.forms.map((item) => capitalize(item.name));
        const stats = response.stats.map((item) => ({
          unit: capitalize(item.stat.name),
          point: item.base_stat,
        }));
        setAbilities(abilities);
        setMoves(moves);
        setForms(forms);
        setStats(stats);
      })
      .catch((error) => console.log(error));
  }, [props]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "1em 1em 1em",
      }}
    >
      <Link
        href="/"
        style={{
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
        }}
      >
        <ArrowBackIosNew />
        Back
      </Link>
      <Paper elevation={4} style={{ marginTop: "1em", padding: "2em" }}>
        {data.name && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span style={{ flex: 1, display: "flex", width: "90%" }}>
              <span style={{ flex: 1 }}>
                <img
                  src={data.sprites.other["official-artwork"]["front_default"]}
                  alt="pokemon image"
                />
              </span>
              <span style={{ flex: 3 }}>
                <Table style={{ height: "100%" }} aria-label="info table">
                  <TableBody>
                    <TableRow key={"name-species"}>
                      <TableCell colSpan={2}>
                        <span style={{ fontWeight: 400, fontSize: "3em" }}>
                          {capitalize(data.name)}
                        </span>
                        &nbsp;(Species: {capitalize(data.species.name)})
                      </TableCell>
                    </TableRow>
                    <TableRow key={"height"}>
                      <TableCell component="th" scope="row">
                        <b>Height</b>
                      </TableCell>
                      <TableCell>{data.height}</TableCell>
                    </TableRow>
                    <TableRow key={"weight"}>
                      <TableCell component="th" scope="row">
                        <b>Weight</b>
                      </TableCell>
                      <TableCell>{data.weight}</TableCell>
                    </TableRow>
                    <TableRow key={"abilities"}>
                      <TableCell component="th" scope="row">
                        <b>Abilities</b>
                      </TableCell>
                      <TableCell>
                        {abilities.map((it) => (
                          <Chip label={it} variant="outlined" />
                        ))}
                      </TableCell>
                    </TableRow>
                    <TableRow key={"forms"}>
                      <TableCell component="th" scope="row">
                        <b>Forms</b>
                      </TableCell>
                      <TableCell>
                        {forms.map((it) => (
                          <Chip label={it} variant="outlined" />
                        ))}
                      </TableCell>
                    </TableRow>
                    <TableRow key={"stats"}>
                      <TableCell component="th" scope="row">
                        <b>Stats</b>
                      </TableCell>
                      <TableCell>
                        {stats.map((it) => (
                          <Chip
                            label={`${it.unit} ${it.point}`}
                            variant="outlined"
                          />
                        ))}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </span>
            </span>
            <span>
              <Table style={{ height: "100%" }} aria-label="info table">
                <TableBody>
                  <TableRow key={"moves"}>
                    <TableCell component="th" scope="row">
                      <b>Moves</b>
                    </TableCell>
                    <TableCell>
                      {moves.map((it) => (
                        <Chip label={it} variant="outlined" />
                      ))}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </span>
          </div>
        )}
      </Paper>
    </div>
  );
}
