import * as React from 'react';
import {Text,View,StyleSheet,Button,TouchableOpacity,TextInput, ImageBackground, Image, Alert} from 'react-native'
import { useState, useEffect} from 'react';
import {getAuth,signInWithEmailAndPassword} from 'firebase/auth'
import khicau from '../assets/khicau.png'
import { not } from 'react-native-reanimated';
export const Login = ({navigation}) =>{
    const [gmail,setGmail] = useState('');
    const [password,setPassword] = useState('');

    //xử xý đăng nhập
    const handleSignIn = () => {
        const auth = getAuth(auth); //lấy đối tượng Auth của firebase Authentication thông qua app
        signInWithEmailAndPassword(auth,gmail,password)//kiểm tra gmail và password trong firebase thông qua auth
        //nếu thành công
        .then((userCredential) =>{
            //sao khi thành công thì sẽ trả về userCredential(có dạng là một cái cái gì đó )
            //Sử dụng thuộc tính user để lấy lên đăng nhập
            const username = userCredential.user;
            console.log("Signed in with : " + username.email);
            setPassword('');
            navigation.navigate('ToDoList',[gmail]);
        })
        //nếu thất bại
        .catch(error =>{
            alert("Tài khoản sai hoặc chưa đăng kí" + "\n" + "Mã lỗi: " + error.code);
            console.log("Mã lỗi: " + error.code);
        })
    }

    return(
        <View style={styles.container}>
            <ImageBackground source={khicau} style={styles.BackgroundImage} resizeMode='cover'>
            <View style={styles.overlay}/>

                <View style = {styles.heading}>
                    <Image style={styles.logo}
                        source={require('../assets/logoo.png')}>
                    </Image>
                    <Text style = {styles.text}>  TO DO LIST </Text>
                </View>

                <View style = {styles.input}>
                    
                    {/* Input gmail */}
                    <TextInput 
                    value = {gmail}
                    onChangeText={text => setGmail(text)} 
                    style = {styles.ip} placeholder='Username'></TextInput>

                    {/* Input password */}
                    <TextInput 
                    value = {password}
                    secureTextEntry
                    onChangeText={text => setPassword(text)} 
                    style = {styles.ip} placeholder='Password'></TextInput>

                    {/* Nút login */}
                    <TouchableOpacity style = {styles.login} onPress={handleSignIn}>
                        <Text style = {{fontSize : 30}}>Log in</Text>
                    </TouchableOpacity>

                    {/* Nút tạo tài khoản */}
                    <TouchableOpacity style = {styles.CreateAccount} onPress={() => navigation.navigate("CreateAccount")}>
                        <Text style = {{textDecorationLine : 'underline', fontSize : 20, color: '#ffff'}}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}
// background
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009f75',
        
    },
    BackgroundImage : {
        height:1100,
        width:600


    },
    overlay : {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(71, 71, 72, 0.5)',
        position:'absolute'
    },
    heading : {
        textAlign : 'center',
        fontSize : 50,
        marginTop : 200,
        alignItems:'center',
        justifyContent:'center',
        flexDirection: 'row',
        paddingBottom: 60
        
    },
    logo : {
        width:100,
        height:100,
        borderRadius :50,
    },
    // chữ todo app
    text : {
        textAlign:'center',
        fontSize:35,
        color:'#ffff',
        fontWeight: 'bold'
    },

    //style tổng cho 2 ô input

    input : {
        marginTop : 10,
        alignItems : 'center',
    },
    
    //style chỉ tiết cho 2 ô input

    ip :{
        marginTop : 30,
        backgroundColor : '#bbe6f3',
        width : 470,
        height : 70,
        textAlign : 'center',
        fontSize : 20
    },
    //style cho nút login
    login : {
        marginTop : 30,
        backgroundColor : '#f9f93b',
        textAlign : 'center',
        width : 470,
        height : 60,
        alignItems : 'center',
        textAlign: 'center',
        justifyContent : 'center'
    },
    // sign up
    CreateAccount : {
        marginTop : 250,
        textAlign : 'center',
        width : 150,
        height : 50,
        borderRadius : 50,
        alignItems : 'center',
        textAlign: 'center',
        justifyContent : 'center',
    }
});