import React from 'react';
import PropTypes from 'prop-types';

import FileSaver from 'file-saver';

import withRoot from '../../withRoot';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl/';
import TextField from '@material-ui/core//TextField';
import SaveIcon from '@material-ui/icons/Save';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
    root: {
        textAlign: 'center',
        paddingTop: theme.spacing.unit * 20,
    },

    cards: {
        margin: theme.spacing.unit * 4,
        display: 'flex',
        flexDirection: 'row',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
            .spacing.unit * 3}px`,
    },
    input: {
        display: 'none',
    },
    card: {
        maxWidth: 345,
        margin: theme.spacing.unit * 2,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    buttons: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginLeft: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit,
    },
});

class CSVBackup extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.axios = this.props.axios;
      const algus = new Date();
      const lopp = new Date();

      algus.setMonth(algus.getMonth() - 1);
      algus.setDate(1);
      lopp.setMonth(lopp.getMonth());
      lopp.setDate(0);
      let formValues = { ...this.state.formValues };
      formValues.alates = algus.toDateInputValue();
      formValues.kuni = lopp.toDateInputValue();

      this.state.formValues =  formValues;

    }

    state = {
        open: false,
        formValues: {
            alates: "",
            kuni: "",
        },
        results: {}

    };


    handleClickOpen = () => {
        this.setState({drawerOpen: true});
    };
    handleClose = () => {
        this.setState({drawerOpen: false});
    };


    handleChange = event => {
        const formValues = this.state.formValues;
        formValues[event.target.id] = event.target.value;
        this.setState({formValues: formValues});
    };

    getCSV = () => {
        if (this.correctDates()) {
            this.axios.get('export_csv.php', {
                params: {
                    alates: this.state.formValues.alates,
                    kuni: this.state.formValues.kuni,
                }
            }).then(res => {
                    let data = res.data;
                    this.setState({results: data});
                    this.downloadCSV()

                })
                .catch(err => {
                    console.log("export err: ", err)
                })
        }
    };

    downloadCSV = () => {
        let csv = this.state.results;
        console.log(csv);

        let filename = 'export.txt';

        const blob = new Blob([csv], {type: 'data:text/csv;charset=utf-8'});
        FileSaver.saveAs(blob, filename);
    };

    render() {
        const {classes} = this.props;


        const makeDateField = (id, label) => (
            <FormControl required margin="normal" className={classes.formControl}>
                <TextField
                    value={this.state.formValues[id]}
                    id={id}
                    label={label}
                    type="date"
                    onChange={this.handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </FormControl>
        );

        return (
            <React.Fragment>
                <Card className={classes.card}>
                    <CardActionArea onClick={this.handleClickOpen}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Põhitabeli CSV
                            </Typography>
                            <Typography component="p">
                                Põhitabeli CSV on suur fail, millega saab andmeid
                                analüüsimiseks tuua mõnesse teise programmi.
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>

                            <form onSubmit={this.handleDownload}>

                                <Grid container
                                      direction="column"
                                      justify="center"
                                      alignItems="center"
                                      spacing={8}>
                                    <Grid item>

                                        {makeDateField('alates', 'Alates')}
                                        {makeDateField('kuni', 'Kuni')}
                                    </Grid>

                                    <Grid item>
                                        <Button className={classes.button} variant="outlined" type="submit"
                                                size="small">
                                            <SaveIcon className={classes.leftIcon}/>
                                            Lae alla
                                        </Button>
                                    </Grid>
                                </Grid>

                            </form>




                </CardActions>
            </Card>
    </React.Fragment>
    )
        ;
    }

    correctDates() {
        const start = this.state.formValues.alates.split("-");
        const end = this.state.formValues.kuni.split("-");

        return parseInt(start[0]) <= parseInt(end[0]) && parseInt(start[1]) <= parseInt(end[1]) && parseInt(start[2]) <= parseInt(end[2]);

    }
    handleDownload = event => {
        event.preventDefault();
        this.getCSV()
    }
}

CSVBackup.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(CSVBackup));
