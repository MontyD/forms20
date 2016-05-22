class StyleFormCtrl {

    constructor(tempFormsService, $rootScope, $state) {

      this.tempFormsService = tempFormsService;

      this.$rootScope = $rootScope;

      this.$state = $state;

    }

    go(location) {
        // this.tempFormsService.update(this.$rootScope.id, this.$rootScope.hash, this.form)
        //     .then(result => {
        //             console.log(result);
                    this.$state.go(location);
    //             },
    //             //TODO error trap;
    //             result => console.error(result)
    //         );
   }

}

export default StyleFormCtrl;
