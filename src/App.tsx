import { Formik, Form, Field } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Fieldset } from './components/Fieldset';

const REQUIRED_MESSAGE = 'This field is required.'

const isFieldInvalid = (touched: boolean, error: boolean, value: boolean): boolean => {
  if (!touched)
    touched?.maxPercent && errors?.maxPercent ? "true" : "false"
};

function App() {
  const [workingDays, setWorkingDays] = useState(0);
  const [isFetchSuccessful, setIsFetchSuccessful] = useState(true);

  const date = new Date();
  const currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear();

  useEffect(() => {
    fetch(`https://kalendarz.livecity.pl/czas-pracy/${currentYear}`, {
      method: 'GET',
      mode: 'no-cors'
    }).then(
      response => console.log(response.text())
    );
  });

  const validationSchema = Yup.object().shape({
    maxPercent: Yup.number()
      .min(1, 'Min value is 1.')
      .max(100, 'Max value is 100.')
      .required(REQUIRED_MESSAGE),
    daysOff: Yup.number()
      .min(1, 'Min value is 0.')
      .max(100, `Max value is ${workingDays}.`)
      .required(REQUIRED_MESSAGE),
  });

  return (
    <main className='container half'>
      <h1>
        KUP calculator
      </h1>
      <article>
        <p>
          Current month/year: <strong>{currentMonth}/{currentYear}</strong>
        </p>
        <span>
          Possible working days: <strong>{workingDays}</strong>
        </span>
      </article>
      <Formik
        initialValues={{
          maxPercent: 75,
          daysOff: ''
        }}
        validationSchema={validationSchema}
        onSubmit={() => { }}
      >
        {({
          touched,
          errors,
          values
        }) => {
          const calculatedValue = (
            (workingDays - values.daysOff) / workingDays)
            * values.maxPercent;

          return (
            <>
              <Form>
                <Fieldset
                  name='maxPercent'
                  error={errors?.maxPercent}
                  touched={touched?.maxPercent}
                  value={values?.maxPercent}
                />
                <Fieldset
                  name='daysOff'
                  error={errors?.daysOff}
                  touched={touched?.daysOff}
                  value={values?.daysOff}
                />
              </Form>
              {
                values?.daysOff && values?.daysOff &&
                <mark>
                  Your calculated KUP percentage this month is: <strong>60%</strong>
                </mark>
              }
            </>

          )
        }}
      </Formik>
    </main>
  )
}

export default App
