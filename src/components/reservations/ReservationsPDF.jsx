import dateFormat from "dateformat";
import {
  Image,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

// styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

function ReservationsPDF({
  image,
  title,
  totalCredits,
  seats,
  schedule,
  date,
  cinema,
}) {
  return (
    <Document>
      <Page
        size="A4"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            padding: 10,
          }}
        >
          <Text style={{ marginBottom: 5 }}>
            PELISPELIS: {dateFormat(Date.now())}
          </Text>
          <Image
            src={{ uri: image, method: "GET", headers: {}, body: "" }}
            alt="random image"
            style={{ maxWidth: "600px", maxHeight: "400" }}
          />
          <Text style={{ color: "#3388af", fontSize: "42px" }}>{title}</Text>
          <Text
            style={{
              color: "gray",
              fontStyle: "italic",
              fontSize: "20px",
            }}
          >
            Creditos gastados: {totalCredits}
          </Text>

          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text
              style={{
                color: "gray",
                fontStyle: "italic",
                fontSize: "20px",
              }}
            >
              Asientos:{" "}
            </Text>

            {seats.map((item, index) => (
              <Text
                style={{
                  color: "gray",
                  fontStyle: "italic",
                  fontSize: "20px",
                  marginRight: "5px",
                }}
                key={index}
              >
                {item}
              </Text>
            ))}
          </View>

          <Text
            style={{
              color: "gray",
              fontStyle: "italic",
              fontSize: "20px",
            }}
          >
            Horario: {schedule}
          </Text>

          <Text
            style={{
              color: "gray",
              fontStyle: "italic",
              fontSize: "20px",
            }}
          >
            Fecha: {dateFormat(date, "shortDate")}
          </Text>

          <Text
            style={{
              color: "gray",
              fontStyle: "italic",
              fontSize: "20px",
            }}
          >
            Sala: {cinema}
          </Text>
        </View>
      </Page>
    </Document>
  );
}

export default ReservationsPDF;
