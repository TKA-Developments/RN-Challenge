import React, {useState} from "react";
import {View, Text, StyleSheet} from "react-native";

import qod from "../api/qod";

const Quote = () => {
    const [quote, setQuote] = useState({
        title: "",
        content: "",
        author: ""
    });      

    const quoteGenerator =  qod.get("/qod?language=en")
    .then((response) => {
             const api = response.data.contents.quotes[0];
             setQuote(() => {
                 return {
                     title: api.title,
                     content: api.quote,
                     author: api.author
                 }
             });
        });

    return (<View style={styles.container}>
        <Text style={styles.title}>{quote.title}:</Text>
        <Text style={styles.content}>"{quote.content}"</Text>
        <Text style={styles.author}>- {quote.author}</Text>
        </View>);
};

const styles = StyleSheet.create({
    container: {
    },
    title: {
        marginBottom: 25,
        color: "#282846"
    },
    content: {
        lineHeight: 25,
        fontStyle: "italic",
        color: "#282846"
    },
    author: {
        textAlign: "right",
        color: "#282846"
    }
});

export default Quote;