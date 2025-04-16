import { AddIncomeForm, TransactionList } from "@/features/transaction";
import { Container } from "@/shared/ui/container";

function App() {
  return (
    <>
      <header className="py-4">
        <Container>
          <div className="text-center flex flex-col items-center">
            <h1 className="text-2xl">wallet+</h1>
            <p className="text-sm mt-2 max-w-[300px]">
              Это приложение для отслеживания доходов и расходов
            </p>
          </div>
        </Container>
      </header>
      <main>
        <Container>
          <AddIncomeForm />
          <TransactionList className="mt-5" />
        </Container>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
