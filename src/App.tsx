import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Fieldset } from './components/Fieldset';

const REQUIRED_MESSAGE = 'This field is required.'

function App() {
  const date = new Date();
  const currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear();
  const lastDayOfMonth = (new Date(currentYear, currentMonth, 0)).getDate();

  const validationSchema = Yup.object().shape({
    maxPercent: Yup.number()
      .min(1, 'Min value is 1.')
      .max(100, 'Max value is 100.')
      .required(REQUIRED_MESSAGE),
    workingDays: Yup.number()
      .min(18, 'Min value is 18.')
      .max(25, 'Max value is 25.')
      .required(REQUIRED_MESSAGE),
    daysOff: Yup.number()
      .min(0, 'Min value is 0.')
      .max(25, `Max value is 25.`)
      .required(REQUIRED_MESSAGE),
  });

  return (
    <main className='container half'>
      <code>
        KUP calculator
      </code>
      <article>
        Current month/year: <strong>{currentMonth}/{currentYear}</strong><br/>
        This month has <strong>{lastDayOfMonth.toString()} days</strong>.
      </article>
      <Formik
        initialValues={{
          maxPercent: 75,
          workingDays: '',
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
          let calculatedValue;

          if (
            typeof values.workingDays === 'number' &&
            typeof values.daysOff === 'number' &&
            typeof values.maxPercent === 'number'
          ) {
            calculatedValue = Math.round((
              (values.workingDays - values.daysOff) /
              values.workingDays
            ) * values.maxPercent);
          }

          return (
            <>
              <Form>
                <Fieldset
                  name='maxPercent'
                  label='Max cost percentage allowed by your employer.'
                  error={errors?.maxPercent}
                  touched={touched?.maxPercent}
                  value={values?.maxPercent}
                />
                <Fieldset
                  name='workingDays'
                  label={<>
                    <span>Amount of working days this month. </span>
                    <a
                      href={`https://www.kalendarzswiat.pl/wymiar_czasu_pracy/${currentYear}`}
                      target='_blank'
                    >Check working days here.</a>
                  </>}
                  error={errors?.workingDays}
                  touched={touched?.workingDays}
                  value={values?.workingDays}
                />

                <Fieldset
                  name='daysOff'
                  label='Amount of days off you have used this month.'
                  error={errors?.daysOff}
                  touched={touched?.daysOff}
                  value={values?.daysOff}
                />
              </Form>
              {
                calculatedValue &&
                <mark>
                  Your calculated KUP percentage this month is: <strong>~{calculatedValue}%</strong>
                </mark>
              }
            </>

          )
        }}
      </Formik>
      <footer>
        <span>
          Created by <a href="http://dybowski.pro" target='_blank'>Seb Dybowski</a>.
        </span>
        <p>
          Like it? Star the <a href="https://github.com/sebdybowski/kup-calc">GitHub project</a>!
        </p>
      </footer>
    </main>
  )
}

export default App
