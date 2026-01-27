import Title from '@components/atoms/Title/Title.tsx';
import { useAuthStore } from '@store/auth.store.ts';

function Dashboard() {
  const { user } = useAuthStore();

  console.log(user);
  return (
    <section>
      <div>
        <Title text={`Welcome, ${user?.username}`} />
      </div>
    </section>
  );
}

export default Dashboard;