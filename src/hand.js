import Card from './card.js';


/**Player's hand (two cards) */
const Hand = ({ cards: [{ readableValue: value1, suitSymbol: suitSymbol1, suit: suit1 },
  { readableValue: value2, suitSymbol: suitSymbol2, suit: suit2 }], fold }) => {
  return (<>
    <table>
      <tbody>
        <tr>
          <td>
            <Card value={value1} suit={suitSymbol1} fold={fold} red={suit1 === 'd' || suit1 === 'h'} />
          </td>
          <td>
            <Card value={value2} suit={suitSymbol2} fold={fold} red={suit2 === 'd' || suit2 === 'h'} />
          </td>
        </tr>
      </tbody>
    </table>
  </>);
};

export default Hand;