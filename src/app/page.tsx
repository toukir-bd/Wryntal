import styles from "./page.module.scss";
import { createClient } from "@/utils/supabase/client";

export default async function Home() {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();

  return (
    <main className={styles.main}>
      <div className={styles.test}>{data?.user?.email}</div>
      {data?.user?.email && <p>data?.user?.email</p>}
    </main>
  );
}
