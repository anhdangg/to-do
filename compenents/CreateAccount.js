import {Text,TextInput,TouchableOpacity,View,Button,StyleSheet, Alert} from 'react-native'
import {useState} from 'react'
import {getAuth,createUserWithEmailAndPassword} from 'firebase/auth';
import {app} from '../config/firebase'
import { ImageBackground } from 'react-native';
import khicau from '../assets/khicau.png'
export const CreateAccount = ({navigation}) =>{
    const [gmail,setGmail]  = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    // xử lý tạo tài khoản
    const handleCreateAccount = () =>{
        if(gmail.slice(-10) != '@gmail.com') alert("Vui lòng nhập đúng gmail");
        if(password != confirmPassword) alert('Mật khẩu nhập lại không đúng');

        const auth = getAuth(app); //lấy đối tượng Auth của firebase Authentication thông qua app
        createUserWithEmailAndPassword(auth,gmail,password)// tạo tài khoản mới với gmail và password và lưu vào firebas thông qua auth
        //nếu thành công
        .then((userCredential) =>{
            // trả về 1 userCredential
            const username = userCredential.user;
            console.log("Signed up with : " + username.email);
            alert('Tài khoản tạo thành công');
        })
        // nếu thất bại
        .catch(error =>{
            alert(error.code);
        })
    }

    return (
        <View style = {styles.container}>
            <ImageBackground source={khicau} style={styles.BackgroundImage} resizeMode='cover'>
                <View style={styles.overlay}/>
            
                        {/* Phần input */}
                    <View style = {styles.input}>
                    <Text style={styles.signup}>CREATE ACCOUNT</Text>


                        {/* ô nhập gmail */}
                        <TextInput 
                        style = {styles.ip} 
                        onChangeText={text => setGmail(text)} 
                        placeholder='Gmail'></TextInput>

                        {/* Ô nhập password */}
                        <TextInput 
                        style = {styles.ip} 
                        onChangeText={text => setPassword(text)} 
                        secureTextEntry
                        placeholder='Password'></TextInput>

                        {/* Ô xác nhận password */}
                        <TextInput 
                        style = {styles.ip} 
                        onChangeText={text => setConfirmPassword(text)} 
                        secureTextEntry
                        placeholder='Confirm Password'></TextInput>
                        
                   
                        {/* Phần nút */}
                    
                        {/* Nút tạo tài khoản */}
                        <TouchableOpacity
                        style = {styles.createAccount}
                        onPress={handleCreateAccount}>
                            <Text style = {{fontSize : 20}}>Sign Up</Text>
                        </TouchableOpacity>
                    
                        {/* nút quay trở lại màn hình login */}
                        <Button style={styles.back} title='Back' onPress={() => navigation.navigate('Login')}/>
                    </View>
                    
            </ImageBackground> 
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex : 1,
        alignItems : 'center',

    },
    BackgroundImage : {
        height:'100%',
        width:'100%'



    },
    overlay : {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(71, 71, 72, 0.5)',
        position:'absolute'
    },
// chữ singup
    signup : {
        fontSize:40,
        color: '#ffff',
        fontWeight:'bold',
        marginTop:150,
        marginBottom:30
    },
    //style tổng cho 2 ô input
    input : {
        marginTop : 70,
        alignItems : 'center',

    },

    //style chỉ tiết cho nhập gmail, mật khẩu, xác nhận mật khẩu
    ip :{
        marginTop : 30,
        backgroundColor : '#bbe6f3',
        width : 470,
        height : 70,
        textAlign : 'center',
        fontSize : 20,
        marginBottom:10
    },
    //style cho nút tạo tài khoản
    createAccount : {
        marginTop : 20,
        marginBottom : 20,
        backgroundColor : '#f9f93b',
        textAlign : 'center',
        width : 470,
        height : 60,
        alignItems : 'center',
        textAlign: 'center',
        justifyContent : 'center'
    },

   
});