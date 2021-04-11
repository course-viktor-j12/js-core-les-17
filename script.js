$(document).ready(function () {
    let startGame = $('.startGame');
    let checkResult = $('.checkResult');
    let newGame = $('.newGame');

    let modalBlock = $('.modalBlock');
    let modal = $('.modal');
    let modal_p = $('.modal p');

    let intervalID;
    let time = $('.time')
    let min = 0;
    let sec = 59;

    let block1 = $('.block1');
    let block2 = $('.block2');



    let check;
    let imgArr = ['images/image_part_001.jpg', 'images/image_part_002.jpg', 'images/image_part_003.jpg', 'images/image_part_004.jpg', 'images/image_part_005.jpg',
        'images/image_part_006.jpg', 'images/image_part_007.jpg', 'images/image_part_008.jpg', 'images/image_part_009.jpg', 'images/image_part_010.jpg',
        'images/image_part_011.jpg', 'images/image_part_012.jpg', 'images/image_part_013.jpg', 'images/image_part_014.jpg', 'images/image_part_015.jpg',
        'images/image_part_016.jpg'];

    function genDiv(){
        for (let i = 0; i < 16; i++) {
            block1.append(`<div id=${i} class="drag"></div>`);
            block2.append(`<div class="drop"></div>`);
        }
        for (let j = 0; j < 16; j++) {
            $(`#${j}`).append(`<img src=${imgArr[j]}>`);
        }
    };

    function DragDrop(){
        $('img').draggable({
            revert: 'invalid',
            distance: 50,
            snap: '.drop',
            containment: '.blocks',
        });
        $('.drop').droppable({
            drop: function (event, ui) {
                // console.log('event, ui')
                let dropped = ui.draggable;
                let droppedOn = $(this);
                // $(droppedOn).droppable("disable");
                // $(dropped).parent().droppable("enable");
                $(dropped).detach().css({ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0,
                }).appendTo(droppedOn);
                $('.drop').not('.drop:empty').droppable('disable');

            }
        });
    }

    genDiv();
        
    startGame.on('click', function () {
        DragDrop();

        let child = block1.children()
        while (child.length) {
            block1.append(child.splice(Math.floor(Math.random() * child.length), 1)[0])
        };
        $('.check').css('display', 'block');
        checkResult.css('background', 'rgb(255,0,0)');
        checkResult.attr('disabled', false);
        $(this).attr('disabled', true);
        if (startGame.attr('disabled')) {
            startGame.css('background', 'rgba(255,0,0,0.35)')
        }
        console.log(min, sec);

        intervalID = setInterval(() => {
            time.text(`0${min}:${sec}`);
            sec -= 1;
            if(sec == -1){
                modalBlock.fadeIn(200, function () {
                    $(this).addClass('active')
                });
                modal_p.text(`It's a pity, but you lost`);
                $('.check').css('display', 'none');
                checkResult.attr('disabled', true);
                checkResult.css('background', 'rgba(255,0,0,0.35)');
                stopInterval();
                time.text(`00:00`);

                $('.close').on('click', function () {
                    modalBlock.fadeOut(200, function () {
                        $(this).removeClass('active')
                    });
                })
            }
        }, 1000);

        function stopInterval() {
            clearInterval(intervalID);
            sec = 59;
        }

        checkResult.on('click', function () {
            
            let newArr = [];
            for (i = 0; i < 16; i++) {
                
                newArr.push($('.drop img').eq(i).attr('src'));
            }
            // console.log(newArr)
            modalBlock.fadeIn(200, function () {
                $(this).addClass('active')
            });
            $('.close').addClass('choice1');
            $('.check').addClass('choice1');
            modal_p.text(`You still have time, you sure? 0${min}:${sec}`);

            $('.close').on('click', function () {
                modalBlock.fadeOut(200, function () {
                    $(this).removeClass('active')
                });
            })
            $('.check').on('click', function () {
                console.log(newArr)

                for(i=0;i<1;i++){
                    if(imgArr[i] == newArr[i]){
                        check = true;
                        console.log('check = true')
                    }
                    else {
                        check = false;
                        console.log('check = false')
                    }
                    
                }
                if(check){
                    modal_p.text(`Woohoo, well done, you did it`);
                    $('.check').css('display', 'none');
                    
                    $('.close').on('click', function () {
                        
                        modalBlock.fadeOut(200, function () {
                            $(this).toggleClass('active');
                            checkResult.attr('disabled', true);
                            if (checkResult.attr('disabled')) {
                                checkResult.css('background', 'rgba(255,0,0,0.35)')
                            }
                            stopInterval();

                            time.text(`00:00`);
                        });
                    });
                }
                else {
                    modal_p.text(`It's a pity, but you lost`);
                    $('.check').css('display', 'none');
                    checkResult.attr('disabled', true);
                    checkResult.css('background', 'rgba(255,0,0,0.35)');
                    stopInterval();
                    time.text(`00:00`);
                }
                $('.close').on('click', function () {
                    modalBlock.fadeOut(200, function () {
                        $(this).removeClass('active')
                    });
                })
                
               
            });
        });
        newGame.on('click', function () {
            stopInterval();
            time.text(`01:00`);
            
            startGame.attr('disabled', false);
            startGame.css('background', 'rgb(255,0,0)');
                block2.html('');
                block1.html('');

            genDiv();
            
            
            let child = block1.children()
            while (child.length) {
                block1.append(child.splice(Math.floor(Math.random() * child.length), 1)[0])
            };
        })
    });
    
});