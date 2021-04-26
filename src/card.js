
/** A visual card representation */
const Card = ({ value, suit, fold }) => {
  return (<>
    <table className={'card' + (fold ? ' fold' : '')}>
      <tbody>
        <tr><td className="card_suit_top">{suit || '?'}</td></tr>
        <tr><td className="card_value">{value || '?'}</td></tr>
        <tr><td className="card_suit_bottom">{suit || '?'}</td></tr>
      </tbody>
    </table>
  </>);
};

export default Card;