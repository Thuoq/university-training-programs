export default{
    signIn({commit}, userAcc){
        return this.$axios
        .$post('http://localhost:5000/auth/signIn', userAcc)
        .then((result) => {
          this.$router.push('/');
          commit('setUserInfor', result);
        })
        .catch((e) => {
            console.log(e)
          }
        );
    }
}