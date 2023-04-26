import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';


export default function InfoTable(props) {
  return (
    <React.Fragment>
      <Title>{props.title}</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            {props.heads.map((head) => (
              <TableCell>{head}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows ? props.rows.map((row) => (
            <TableRow>
              {Array.from(Object.entries(row)).map(([key, value]) => (
                <TableCell key={key}>{value}</TableCell>
              ))}
            </TableRow>
          )) : <TableRow></TableRow>}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
