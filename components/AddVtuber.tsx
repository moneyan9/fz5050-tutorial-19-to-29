import { Formik, Form, Field } from 'formik';
import { Button, Box, FormGroup, TextField } from '@material-ui/core';
import axios from 'axios';
import useSWR, { mutate, trigger } from 'swr';

const AddVtuber = () => {

    //mutate用に先にデータフェッチをしておく
    const { data } = useSWR('http://localhost:4001/persons');

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


                    //post前にフェッチしているデータに対し更新をいれる。
                    //第２引数にフェッチデータdataとformikでバインドしてるvaluesを連結させる
                    //ただし,
                    //revalidate=false⇒SWRでのデータ再取得はaxios.postの後にする
                    mutate('http://localhost:4001/persons', [...data, values], false);


                    await axios.post('http://localhost:4001/persons', values);

                    formikHelpers.resetForm();//フォームリセット
                    //alert(` input data ${values.name} and ${values.details} added ! `)
                    trigger('http://localhost:4001/persons');
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