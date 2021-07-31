import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';
import { useTransactions } from '../../hooks/useTransactions';

import { Container } from "./styles";

export function Summary(){
  const {transactions} = useTransactions();

  const summary = transactions.reduce((acc, transition) =>{
    if (transition.type === 'deposit') {
      acc.deposits += transition.amount;
      acc.total += transition.amount;
    }else{
      acc.withdraw += transition.amount
      acc.total -= transition.amount
    }
    return acc;
  }, {
    deposits: 0,
    withdraw: 0,
    total:0
  })

  return(
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Icone de entrada" />
        </header>
        <strong>
        {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(summary.deposits)}
        </strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Icone de saída" />
        </header>
        <strong>
        - {new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(summary.withdraw)}
        </strong>
      </div>

      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Icone de total" />
        </header>
        <strong>
        {new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(summary.total)}
        </strong>
      </div>
    </Container>
  );
}