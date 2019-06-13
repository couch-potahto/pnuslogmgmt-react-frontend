import React, { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import axios from 'axios'
// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
  createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
  createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
];

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
}));

export default function Loan() {
  const classes = useStyles();
  const [data, setData] = useState({hits:[]})
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://localhost:8000/core/api/request/all',
      );
      console.log(data)
      data.hits = result.data;
      console.log(data)
      console.log(data.hits)
    };

    fetchData();

  }, []);

  return (

    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Ref.</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Approved</TableCell>
            <TableCell>Complete</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.hits.map(row => (
            <TableRow key={row.id}>
              <TableCell>

                  {row.transaction_ref}

              </TableCell>
              <TableCell>{row.borrower_name}</TableCell>
              <TableCell>{row.borrower_contact}</TableCell>
              <TableCell>{row.approved ? 'Approved' : 'Not Approved'}</TableCell>
              <TableCell>{row.approved ? 'Returned' : 'Not Returned'}</TableCell>
              <TableCell align="right">
                <Button size="small" variant="outlined" color="primary" className={classes.button}>
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="javascript:;">
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}
