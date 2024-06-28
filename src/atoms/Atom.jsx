let H2 = ({content}) => <h2>{content}</h2>
let Button = ({content,property,onfunction}) => <button className={property} onClick={onfunction}>{content}</button>

export {H2,Button}