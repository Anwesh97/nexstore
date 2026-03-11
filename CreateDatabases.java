import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

public class CreateDatabases {
    public static void main(String[] args) {
        String url = "jdbc:postgresql://localhost:5432/postgres";
        String user = "postgres";
        String password = "postgres";

        String[] dbs = {"ecom_auth", "ecom_products", "ecom_orders"};

        try (Connection conn = DriverManager.getConnection(url, user, password);
             Statement stmt = conn.createStatement()) {

            for (String db : dbs) {
                try {
                    stmt.executeUpdate("CREATE DATABASE " + db);
                    System.out.println("Created database: " + db);
                } catch (Exception e) {
                    System.out.println("Database might already exist: " + db + " - " + e.getMessage());
                }
            }
            System.out.println("Database setup complete.");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
