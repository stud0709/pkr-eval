import Card from './card.js';


/**Player's hand (two cards) */
const Hand = ({ cards: [{ readableValue: value1, suitSymbol: suit1 }, { readableValue: value2, suitSymbol: suit2 }], fold }) => {
  return (<>
    <table>
      <tbody>
        <tr>
          <td>
            <Card value={value1} suit={suit1} fold={fold} />
          </td>
          <td>
            <Card value={value2} suit={suit2} fold={fold} />
          </td>
        </tr>
      </tbody>
    </table>
  </>);
};

export default Hand;