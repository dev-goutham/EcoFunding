import makeResponsiveComponent from './make-responsive-component'

export default makeResponsiveComponent(
  [
    {
      constraint: 'min',
      width: '0px',
      rules: `
        font-size: 14px;
        color: black;
      `
    }, {
      constraint: 'min',
      width: '320px',
      rules: `
        font-size: 28px;
        color: black;
      `
    }, {
      constraint: 'min',
      width: '640px',
      rules: `
        font-size: 42px;
        color: black;
      `
    }, {
      constraint: 'min',
      width: '960px',
      rules: `
        font-size: 56px;
        color: black;
      `
    }
  ]
)
