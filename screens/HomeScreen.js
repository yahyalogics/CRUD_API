import { useNavigation } from '@react-navigation/core'
//import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View , TextInput  } from 'react-native';
import React, { useState, useEffect } from 'react';
import { collection, addDoc } from "firebase/firestore";

import { auth } from '../firebase'
import { db } from "../firebase";

const HomeScreen = () => {

  const navigation = useNavigation()
  const initalState = {
    docname : "",
    email : "",
  };
  const display = ()=>{
    console.log(state.docname);
  }
  const [state, setState] = useState(initalState);
  const handleChangeText = (value, docname) => {
    setState({ ...state, [docname]: value });

  };
  const handleChangeTextemail = (value, email) => {

    setState({ ...state, [email]: value });
  };
  const deleteData = (docId) => {
    console.log("Deleting");
    db.collection("users")
      .doc(state.docname)
      .delete()
      .then((res) => {
        alert("User Deleted Sucessfully" , state.docname)
        console.log("Document successfully deleted!", res);
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };
  const [user, setUser] = useState();
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }
  var xyz = "yahya";
  const getUser = async () => {
    console.log(state.docname);
    try {
      const documentSnapshot = await db
        .collection('users')
        .doc(state.docname)
        .get();

      const userData = documentSnapshot.data();
      setUser(userData);
      console.log(userData);
      console.log("jdbhjbjebf");
    } catch {
      //do whatever
    }
  };
  const updateData = () => {
    db.collection("users")
      .doc(state.docname)
      .update({
        email: state.email ,

      })
      .then(() => {
       alert("email updated sucessfully")
      });
  };
  useEffect(() => {
    //getUser();
  });
  return (
    <View style={styles.container}>

      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={getUser}
        style={styles.button}
      >
        <Text style={styles.buttonText}> Fetch Records...</Text>
      </TouchableOpacity>
      <Text>______________________________</Text>
      <TextInput
          placeholder="Enter username here ..."
          onChangeText={(value) => handleChangeText(value, "docname")}
          value={state.docname}
          style={styles.inputlogin}

        />
        <TouchableOpacity
        onPress={deleteData}
        style={styles.button}
      >
        <Text style={styles.buttonText}> Delete User...</Text>
      </TouchableOpacity>
      <View>
      <TextInput
          placeholder="Enter email here ..."
          onChangeText={(value) => handleChangeTextemail(value, "email")}
          value={state.email}
          style={styles.inputlogin}

        />
        <TouchableOpacity
        onPress={updateData}
        style={styles.button}
      >
        <Text style={styles.buttonText}> Update...</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.fetch}>
      <Text  style={styles.fetch}>Fetched User Data..</Text>
      <Text  style={styles.fetch}>username : {user && user?.name}</Text>
      <Text style={styles.fetch}>email : {user && user?.email}</Text>
      <Text style={styles.fetch}>phone : {user && user?.phone}</Text>
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
   button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  fetch:{
fontSize :  25,
backgroundColor : "black",
marginTop : 20,
color : "white"


  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})
