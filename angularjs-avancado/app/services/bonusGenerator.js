module.exports = function bonusGeneratorProvider(){
    var _lenght = 5;
    this.getLenght = function(){
        return _lenght;
    };
    this.setLenght = function(lenght){
        _lenght = lenght;
    };

    this.$get = function(){
        return {
            generator: function(){
                var bonus = '';
                for(var i = _lenght;i>0;i--){
                    bonus += Math.floor(Math.random()*10);
                }
                return bonus;
            }
        }
    };
};