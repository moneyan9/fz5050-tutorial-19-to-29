import { Formik, Form, Field } from 'formik';
import { Button, Box, FormGroup, TextField } from '@material-ui/core';
import axios from 'axios';

const AddVtuber = () => {

    return (
        <div>

            <Formik
                initialValues={
                    {
                        name: '',
                        details: ''
                    }
                }
                onSubmit={async (values, formikHelpers) => {

                    await axios.post('http://localhost:4001/persons', values);

                    formikHelpers.resetForm();//フォームリセット
                    alert(` input data ${values.name} and ${values.details} added ! `)
                }}
            >

                <Form>
                    <FormGroup>
                        <Field as={TextField} name="name" label="name" />
                    </FormGroup>

                    <FormGroup>
                        <Field as={TextField} name="details" label="about" />
                    </FormGroup>

                    <Box marginTop={1}>
                        <Button type="submit" variant="contained" color="primary"> Add  </Button>
                    </Box>
                </Form>


            </Formik>

        </div>
    );
}

export default AddVtuber