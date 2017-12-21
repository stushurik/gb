export default ({ready, children}) => (
  ready
    ? children
    : 'loading'
)