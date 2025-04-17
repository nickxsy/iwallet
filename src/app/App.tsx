import {
  AddIncomeForm,
  TotalTransaction,
  TransactionList,
} from "@/features/transaction";
import { Container } from "@/shared/ui/container";
import { AppProvider } from "./app-provider";
import { AppLoader } from "./app-loader";

export function App() {
  return (
    <AppProvider>
      <AppLoader>
        <div className="py-2 h-screen overflow-hidden">
          <Container className="bg-white rounded-2xl overflow-y-auto h-full">
            <header className="py-4">
              <div className="text-center flex flex-col items-center">
                <h1 className="text-2xl">wallet+</h1>
                <p className="text-sm mt-2 max-w-[300px]">
                  Это приложение для отслеживания доходов и расходов
                </p>
              </div>
            </header>
            <main>
              <TotalTransaction />
              <AddIncomeForm />
              <TransactionList className="mt-5" />
            </main>
          </Container>
        </div>
      </AppLoader>
    </AppProvider>
  );
}
