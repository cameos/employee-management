jQuery(document).ready(function ($) {

    //global ajax preloaders
    function preloader_loading(name, id) {
        //initialise and declare variables
        var $fade_out_element = name;
        var $id_to_use = id;
        var doc = $(document);

        //append preloader
        var preloader = $('<div class="load-bar"><div class="bar"></div><div class="bar"></div><div class="bar"></div></div>').appendTo($id_to_use);

        //do some fade in and out for the ajax
        doc.ajaxStart(function () {
            $fade_out_element.fadeOut(300, 'linear', function () {
                $fade_out_element.removeClass('show-for-preloader');
                $fade_out_element.addClass('hide-for-preloader');
            });
            $id_to_use.fadeIn(300, 'linear', function () {
                $id_to_use.removeClass('hide-for-preloader');
                $id_to_use.addClass('show-for-preloader');
            });
        });
        doc.ajaxSuccess(function(){
            $id_to_use.fadeOut(300, 'linear', function(){
                $id_to_use.removeClass('show-for-preloader');
                $id_to_use.addClass('hide-for-preloader');
            });
            $fade_out_element.fadeIn(300, 'linear', function () {
                $fade_out_element.removeClass('hide-for-preloader');
                $fade_out_element.addClass('show-for-preloader');
                //$fade_out_element.show();
            });
        });
    }

    $(document).on('click', '#btn-acme-start', function (evt) {
        console.log("started");
        //start modal management for the acme system
        var target = $('#acme-append');
        target.empty().html();
        

        //content to append at the start of modal system modal
        
        var content = '<div class="row" style="width:95%; margin-left:auto; margin-right:auto;>';
        content += '<div class="col-xs-12">';
        content += '<div class="text-left h5"> Welcome, this system uses web services (REstFul web apis, ASP.NET MVC, JavaScript and Jquery).<br/>Reason for RestfFul webservice over usual web services is resources - they are light on resources than XML webservices <br/>';
        content += '<strong>Before I proceed further, make sure javascript is enabled in your browser (this app uses both desktop and mobile browsers provided it is host where it can be accessed via HTTP protocol).</strong><br/><br/>'
        content += 'The beauty of this system is that it\'s a Single Page Application(SPA), which means it uses less resources as compared to normal web apps, and the code behind it is not tied to any platform or framework.<br/>';
        content += 'This App information can be consumed on Console application, PHP Application, Mobile application or any other platform that uses or allows http protocol.<br/><br/>';
        content += 'The first time you run this app it will take longer maybe a minute or two depending on the system you using. The reason it takes longer is because it is starting to initialise the database and configuring the models needed.<br/>';
        content += 'This back-end configuration uses EntityFrawework, should you change the model configuration then the database will be dropped and recreated when you re-start this app, to avoid this drop and re-create run automatic migrations on nuget console(package manager console).<br/><br/>';
        content += 'The connection string name for the database is set on AcmeContext class, you can change the databse location on webconfig file. Remember this app will not contact database for initialization until the first person is added to the system.<br/><br/>';
        content += 'To get started and found out how it works please click "Start managing" button below :)<br/>';
        content += '</div><br/><br/>';
        content += '<span class="fa fa-bullhorn" aria-hidden="true"></span> Here is what you can manage here.';
        content += '<ul id="acme-welcome-list">';
        content += '<li class="fa fa-check-circle-o"> Person</li>';
        content += '<li class="fa fa-check-circle-o"> Employees</li>';
        content += '<li class="fa fa-check-circle-o"> and whole processes of person and employees relationships</li>';
        content += '</ul>';
        content +='<button style="border-radius:35px;" type="button" id="btn-acme-initial" class="btn btn-warning orange-btn pull-right ">Start managing <i class="fa fa-arrow-circle-right" aria-hidden="true"></i></button>';
        content +='</div></div>';

        //appnde the content
        target.append(content);
        $('#system-modal').modal({ keyboard: false, backdrop: 'static' });
    });
    $(document).on('click', "#btn-acme-initial", function (evt) {
        evt.preventDefault();

        //get target
        var target = $('#acme-append');
        target.empty().html();

        //set the contet
        var content = '<div style="width:80%;margin-left:auto; margin-right:auto;" class="row"><div class="col-xs-12 col-sm-12"><div class="text-center h4">Start Managing<br/>';
        content += '<button style="width:100%;" type="button" id="btn-acme-people" class="btn btn-primary ok-btn  "> People <i class="fa fa-users" aria-hidden="true"></i></button>';
        content += '</div></div></div>';

        //append the content
        target.append(content);
        $('#system-modal').modal({ keyboard: false, backdrop: 'static' });
    });

    //this section will manage people or employess depending on what is choosen initially
    $(document).on('click', "#btn-acme-people", function (evt) {

        //set target
        var target = $('#acme-append');
        target.empty().html();

        //start preloader pulsate signal
        $('#acme-append-preloader').hide()
        preloader_loading($('#acme-append'), $('#acme-append-preloader'));

        $.ajax({
            url: '/api/person',
            type: 'get',
            dataType: 'json',
            cache: false,
            success: function (all) {
                console.log(all);
                if (all.length > 0) {
                    
                    var content = '<div class="row" style="margin-left:auto; margin-right:auto;">';
                    content += '<div class="col-xs-12"><div class="text-left h4"><span class="fa fa-cubes" aria-hidden="true"></span> Welcome,  here is the list of all the people in the system<br/><small>You can delete, view full details, add employees related to person and other CRUD functions</small></div></div>';
                    content += '<div class="col-xs-12"><div class="text-left h6"><button id="btn-new-list-person" type="button" class="btn btn-danger submit-btn"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Add a new person to the system</button></div></div>';
                    content += '<div class="col-xs-12">';
                    content += '<table class="table table-condensed table-responsive table-striped"';
                    $.each(all, function (i, v) {
                        var b = moment(v.BirthDate).format("YYYY-DD-MM");
                        content += '<tr>';
                        content += '<td>' + v.FirstName + '</li>';
                        content += '<td>' + v.LastName + '</li>';
                        content += '<td>birth date: ' + b + '</li>';
                        content += '<td>';
                        content += '<form role="form" class="person-view-form" name="person-view-form">';
                        content += '<input type="hidden" id="hidden-' + v.PersonId + '" name="hidden-' + v.PersonId + '" value="' + v.PersonId + '" />';
                        content += '<input type="submit" class="btn btn-default" style="border:1px solid #ff006e; background-color:#fff; color:#ff006e;" value="View full info" />';
                        content += '</form>';
                        content += '</td>';
                        content += '<td>';
                        content += '<form role="form" class="person-view-update" name="person-view-update">';
                        content += '<input type="hidden" id="hidden-' + v.PersonId + '" name="hidden-' + v.PersonId + '" value="' + v.PersonId + '" />';
                        content += '<input type="submit" class="btn btn-default" style="border:1px solid #ff006e; background-color:#fff; color:#ff006e;" value="Update" />';
                        content += '</form>';
                        content += '</td>';
                        content += '</tr>'
                    });
                    content += '</table>';
                    //append the content after it has been accumulated from the system
                    target.append(content);
                    $('#system-modal').modal({ keyboard: false, backdrop: 'static' });
                } else {
                    var content = '<div style="width:90%; margin-left:auto; margin-right:0;" class="row">';
                    content += '<div class="col-xs-12">';
                    content += '<img src="/Content/landscapes/desert-2.png" style="display:block; margin-left:auto; margin-right:auto;width:200px; height:200px;" class="img-responsive"/>'
                    content += '</div>';
                    content += '<div class="col-xs-12">';
                    content += '<div class="text-center h4">It\'s a desert in here, add people and manage their employees<button style="width:100%;" type="button" id="btn-acme-add-person" class="btn btn-primary submit-btn"> Click here to add a person <i class="fa fa-user" aria-hidden="true"></i></button></div><br/>';
                    content += '</div>';
                    content += '</div>';

                    //append the content
                    target.append(content);
                    $('#system-modal').modal({ keyboard: false, backdrop: 'static' });
                }
            }
        });
    });
    $(document).on('click', '#btn-acme-employees', function (evt) {
        evt.preventDefault();

        
    });


    //section to manage interaction after management of people has been called
    //the follwing click will add new person depend on thw context they are called from but the is only one sbmit form for the person
    $(document).on('click', '#btn-acme-add-person', function (evt) {
        evt.preventDefault();

        //set target
        var target = $('#acme-append');
        target.empty().html();

        //set content for the form
        var content = '<form role="form" id="add-person-form" name="add-person-form">';
        content += '<div class="form-group">';
        content += '<label for="FirstName">Enter person first name</label>'
        content += '<input type="text" name="FirstName" id="FirstName" class="form-control text-control-style" placeholder="enter first name here" />';
        content += '</div>';
        content += '<div class="form-group">';
        content += '<label for="LastName">Enter person last name</label>'
        content += '<input type="text" name="LastName" id="LastName" class="form-control text-control-style" placeholder="enter last name here" />';
        content += '</div>';
        content += '<div class="form-group">';
        content += '<label for="BirthDate">Choose date of birth for the person</label>'
        content += '<input type="date" name="BirthDate" id="BirthDate" class="form-control text-control-style" placeholder="choose you birth date" />';
        content += '</div>';
        content += '<input type="submit" class="btn btn-danger submit-btn" id="btn-submit-person" name="btn-submit-person value="submit"/>'
        content += ' <input type="reset" class="btn btn-warning orange-btn" id="btn-cancel-person" name="btn-cancel-person value="cancel"/>'
        content += '</form>';

        //apppend the target
        target.append(content);
        $('#system-modal').modal({ keyboard: false, backdrop: 'static' });
    });
    $(document).on('click', '#btn-new-list-person', function (evt) {
        evt.preventDefault();

        //set target
        var target = $('#acme-append');
        target.empty().html();

        //set content for the form
        var content = '<form role="form" id="add-person-form" name="add-person-form">';
        content += '<div class="form-group">';
        content += '<label for="FirstName">Enter person first name</label>'
        content += '<input type="text" name="FirstName" id="FirstName" class="form-control text-control-style" placeholder="enter first name here" />';
        content += '</div>';
        content += '<div class="form-group">';
        content += '<label for="LastName">Enter person last name</label>'
        content += '<input type="text" name="LastName" id="LastName" class="form-control text-control-style" placeholder="enter last name here" />';
        content += '</div>';
        content += '<div class="form-group">';
        content += '<label for="BirthDate">Choose date of birth for the person</label>'
        content += '<input type="date" name="BirthDate" id="BirthDate" class="form-control text-control-style" placeholder="choose you birth date" />';
        content += '</div>';
        content += '<input type="submit" class="btn btn-danger submit-btn" id="btn-submit-person" name="btn-submit-person value="submit"/>'
        content += ' <input type="reset" class="btn btn-warning orange-btn" id="btn-cancel-person" name="btn-cancel-person value="cancel"/>'
        content += '</form>';

        //apppend the target
        target.append(content);
        $('#system-modal').modal({ keyboard: false, backdrop: 'static' });

    });
    $(document).on('click', '#btn-another-person', function (evt) {
        evt.preventDefault();

        //set target
        var target = $('#acme-append');
        target.empty().html();

        //set content for the form
        var content = '<form role="form" id="add-person-form" name="add-person-form">';
        content += '<div class="form-group">';
        content += '<label for="FirstName">Enter person first name</label>'
        content += '<input type="text" name="FirstName" id="FirstName" class="form-control text-control-style" placeholder="enter first name here" />';
        content += '</div>';
        content += '<div class="form-group">';
        content += '<label for="LastName">Enter person last name</label>'
        content += '<input type="text" name="LastName" id="LastName" class="form-control text-control-style" placeholder="enter last name here" />';
        content += '</div>';
        content += '<div class="form-group">';
        content += '<label for="BirthDate">Choose date of birth for the person</label>'
        content += '<input type="date" name="BirthDate" id="BirthDate" class="form-control text-control-style" placeholder="choose you birth date" />';
        content += '</div>';
        content += '<input type="submit" class="btn btn-danger submit-btn" id="btn-submit-person" name="btn-submit-person value="submit"/>'
        content += ' <input type="reset" class="btn btn-warning orange-btn" id="btn-cancel-person" name="btn-cancel-person value="cancel"/>'
        content += '</form>';

        //apppend the target
        target.append(content);
        $('#system-modal').modal({ keyboard: false, backdrop: 'static' });
    });
    $(document).on('submit', '#add-person-form', function (evt) {
        evt.preventDefault();

        //var $form = document.forms.namedItem('add-person-form');
        //var $data = $form.serrializeArray();
        var newPerson = {
            FirstName: $('#FirstName').val(),
            LastName: $('#LastName').val(),
            BirthDate: $('#BirthDate').val()
        };

        //set target to append soe stuff too
        var target = $('#acme-append');
        target.empty().html();

        //start preloader loading
        //$('#acme-append-preloader').hide();
        //preloader_loading($('#acme-append'), $('#acme-append-preloader'));

        //send the data via ajax to the server using web apis
        $.ajax({
            url: '/api/person/',
            type: 'Post',
            data:JSON.stringify(newPerson),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            success: function (flag) {
                console.log(flag);
                if (flag == true) {
                    var content = '<div class="row" style="margin-left:auto; margin-right:auto;">';
                    content += '<div class="col-xs-12"><div class="text-center h4">';
                    content += '<img src="/Content/landscapes/like.png" style="display:block; margin-left:auto; margin-right:auto;width:150px; height:150px;" class="img-responsive"/><br/>';
                    content += 'New person has been successfull, you can add more or manage person database<br/>';
                    content += '<button id="btn-another-person" class="btn btn-default" style="background-color:#fff; color:#ff006e; border:1px solid #ff006e; border-radius:1px;">Add more people</button>';
                    content += ' <button id="btn-manage-person" class="btn btn-danger submit-btn">Manage people</button>';
                    content += '</div></div></div>';

                    //append the content to the target
                    target.append(content);
                    $('#system-modal').modal({ keyboard: false, backdrop: 'static' });
                } else {
                    var content = '<div class="row" style="margin-left:auto; margin-right:auto;">';
                    content += '<div class="col-xs-12"><div style="color:red" class="text-center h4">';
                    content += 'Sorry something went wrong we could not add this person, please try again later<br/>';
                    content += '<a href="/Home/Index" id="btn-home" class="btn btn-default" style="background-color:#fff; color:#ff006e; border:1px solid #ff006e; border-radius:1px;">Ok, show me something</button>';
                    content += '</div></div></div>';

                    //append to target
                    target.append(content);
                    $('#system-modal').modal({ keyboard: false, backdrop: 'static' });
                }
            }
        });
    });
    

    //here we cal the manage person api (/api/person/)
    $(document).on('click', '#btn-manage-person', function (evt) {
        evt.preventDefault();

        //set target
        var target = $('#acme-append');
        target.empty().html();

        //start preloader pulsate signal
        //$('#acme-append-preloader').hide()
        //preloader_loading($('#acme-append'), $('#acme-append-preloader'));

        $.ajax({
            url: '/api/person',
            type: 'get',
            dataType: 'json',
            cache: false,
            success: function (all) {
                console.log(all);
                if (all.length > 0) {
                    var content = '<div class="row" style="margin-left:auto; margin-right:auto;">';
                    content += '<div class="col-xs-12"><div class="text-left h4"><span class="fa fa-cubes" aria-hidden="true"></span> Welcome,  here is the list of all the people in the system<br/><small>You can delete, view full details, add employees related to person and other CRUD functions</small></div></div>';
                    content += '<div class="col-xs-12"><div class="text-left h6"><button id="btn-new-list-person" type="button" class="btn btn-danger submit-btn"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Add a new person to the system</button></div></div>';
                    content += '<div class="col-xs-12">';
                    content += '<table class="table table-resonsive table-striped table-condensed"';
                    $.each(all, function (i, v) {
                        content += '<tr>';
                        content += '<td>' + v.FirstName + '</li>';
                        content += '<td>' + v.LastName + '</li>';
                        content += '<td>Birth date: ' + moment(v.BirthDate).format("DD-MM-YYYY") + '</li>';
                        content += '<td>';
                        content += '<form role="form" class="person-view-form" name="person-view-form">';
                        content += '<input type="hidden" id="hidden-' + v.PersonId + '" name="hidden-' + v.PersonId + '" value="' + v.PersonId + '" />';
                        content += '<input type="submit" class="btn btn-default" style="border:1px solid #ff006e; background-color:#fff; color:#ff006e;" value="View full info" />';
                        content += '</form>';
                        content += '</td>';
                        content += '<td>';
                        content += '<form role="form" class="person-view-update" name="person-view-update">';
                        content += '<input type="hidden" id="hidden-' + v.PersonId + '" name="hidden-' + v.PersonId + '" value="' + v.PersonId + '" />';
                        content += '<input type="submit" class="btn btn-default" style="border:1px solid #ff006e; background-color:#fff; color:#ff006e;" value="Update" />';
                        content += '</form>';
                        content += '</td>';
                        content += '</tr>'
                    });
                    content += '</table>';
                    //append the content after it has been accumulated from the system
                    target.append(content);
                    $('#system-modal').modal({ keyboard: false, backdrop: 'static' });
                } else {
                    var content = '<div style="width:90%; margin-left:auto; margin-right:0;" class="row">';
                    content += '<div class="col-xs-12">';
                    content += '<img src="/Content/landscapes/desert-2.png" style="display:block; margin-left:auto; margin-right:auto;width:200px; height:200px;" class="img-responsive"/>'
                    content += '</div>';
                    content += '<div class="col-xs-12">';
                    content += '<div class="text-center h4">It\'s a desert in here, add people and manage their employees<button style="width:100%;" type="button" id="btn-acme-add-person" class="btn btn-primary submit-btn"> Click here to add a person <i class="fa fa-user" aria-hidden="true"></i></button></div><br/>';
                    content += '</div>';
                    content += '</div>';

                    //append the content
                    target.append(content);
                    $('#system-modal').modal({ keyboard: false, backdrop: 'static' });
                }
            }
        });
    });
    $(document).on('click', '#btn-view-manage', function (evt) {
        evt.preventDefault();
        //set target
        var target = $('#acme-append');
        target.empty().html();

        $.ajax({
            url: '/api/person',
            type: 'get',
            dataType: 'json',
            cache: false,
            success: function (all) {
                console.log(all);
                if (all.length > 0) {
                    var content = '<div class="row" style="margin-left:auto; margin-right:auto;">';
                    content += '<div class="col-xs-12"><div class="text-left h4"><span class="fa fa-cubes" aria-hidden="true"></span> Welcome,  here is the list of all the people in the system<br/><small>You can delete, view full details, add employees related to person and other CRUD functions</small></div></div>';
                    content += '<div class="col-xs-12"><div class="text-left h6"><button id="btn-new-list-person" type="button" class="btn btn-danger submit-btn"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Add a new person to the system</button></div></div>';
                    content += '<div class="col-xs-12">';
                    content += '<table class="table table-condensed"';
                    $.each(all, function (i, v) {
                        content += '<tr>';
                        content += '<td>' + v.FirstName + '</li>';
                        content += '<td>' + v.LastName + '</li>';
                        content += '<td>' +moment(v.BirthDate).format("DD-MM-YYYY") + '</li>';
                        content += '<td>';
                        content += '<form role="form" class="person-view-form" name="person-view-form">';
                        content += '<input type="hidden" id="hidden-' + v.PersonId + '" name="hidden-' + v.PersonId + '" value="' + v.PersonId + '" />';
                        content += '<input type="submit" class="btn btn-default" style="border:1px solid #ff006e; background-color:#fff; color:#ff006e;" value="View full info" />';
                        content += '</form>';
                        content += '</td>';
                        content += '<td>';
                        content += '<form role="form" class="person-view-update" name="person-view-update">';
                        content += '<input type="hidden" id="hidden-' + v.PersonId + '" name="hidden-' + v.PersonId + '" value="' + v.PersonId + '" />';
                        content += '<input type="submit" class="btn btn-default" style="border:1px solid #ff006e; background-color:#fff; color:#ff006e;" value="View full info" />';
                        content += '</form>';
                        content += '</td>';
                        content += '</tr>'
                    });
                    content += '</table>';
                    //append the content after it has been accumulated from the system
                    target.append(content);
                    $('#system-modal').modal({ keyboard: false, backdrop: 'static' });
                } else {
                    var content = '<div style="width:90%; margin-left:auto; margin-right:0;" class="row">';
                    content += '<div class="col-xs-12">';
                    content += '<img src="/Content/landscapes/desert-2.png" style="display:block; margin-left:auto; margin-right:auto;width:200px; height:200px;" class="img-responsive"/>'
                    content += '</div>';
                    content += '<div class="col-xs-12">';
                    content += '<div class="text-center h4">It\'s a desert in here, add people and manage their employees<button style="width:100%;" type="button" id="btn-acme-add-person" class="btn btn-primary submit-btn"> Click here to add a person <i class="fa fa-user" aria-hidden="true"></i></button></div><br/>';
                    content += '</div>';
                    content += '</div>';

                    //append the content
                    target.append(content);
                    $('#system-modal').modal({ keyboard: false, backdrop: 'static' });
                }
            }
        });
    });

    //update the one person
    $(document).on('submit', '.person-view-update', function (evt) {
        evt.preventDefault();

        // grab form information
        var $form = $(this);
        var $id = $form.find('input[type="hidden"]').val();

        var target = $('#acme-append');
        target.empty().html();

        //send via ajax to get one one employee for update
        $.ajax({
            url: '/api/person/' + $id,
            type: 'get',
            dataType: 'json',
            cache: false,
            success: function (person) {
                
                if (person !== null) {
                    var content = '<div class="row" style="width:95%;margin-left:auto; margin-right:auto;>"';
                    content += '<div class="col-xs-12"><div class="text-left h4" style="padding:10px;">Update this person</div></div>';
                    content += '<form role="form" name="update-person-form" id="update-person-form"> ';
                    content += '<input type="hidden" name="PersonId" id="PersonId" value="' + person.PersonId + '" />';
                    content += '<div class="form-group">';
                    content += '<label for="FirstName">Enter first name</label>';
                    content += '<input type="text" name="FirstName" id="FirstName" class="form-control text-control-style" placeholder="enter last name here" value="' + person.FirstName + '" />';
                    content += '</div>';
                    content += '<div class="form-group">';
                    content += '<label for="LastName">Enter last name</label>';
                    content += '<input type="text" name="LastName" id="LastName" class="form-control text-control-style" placeholder="enter last name here" value="' + person.LastName + '" />';
                    content += '</div>';
                    //content += '<div class="form-group">';
                    //content += '<label for="BirthDate">choose/enter birth date</label>';
                    //content += '<input type="date" name="BirthDate" id="BirthDate" class="form-control text-control-style" placeholder="enter last name here" value="' + person.BirthDate + '" />';
                    //content += '</div>';
                    content += '<input type="submit" class="btn btn-danger submit-btn" id="btn-submit-person-update" name="btn-submit-person-update" value="submit"/>'
                    content += ' <input type="reset" class="btn btn-warning orange-btn" id="btn-cancel-person-update" name="btn-cancel-person-update" value="cancel"/>'
                    content += '</form>';

                    //append the target
                    target.append(content);
                    $('#system-modal').modal({ keyboard: false, backdrop: 'static' });

                } else {
                    var content = '<div class="row" style="margin-left:auto; margin-right:auto;">';
                    content += '<div class="col-xs-12"><div style="color:red" class="text-center h4">';
                    content += 'Sorry we could not find person information <br/><br/>';
                    content += '<a href="/Home/Index" id="btn-home" class="btn btn-default" style="background-color:#fff; color:#ff006e; border:1px solid #ff006e; border-radius:1px;">Ok, show me something</button>';
                    content += '</div></div></div>';

                    //append to target
                    target.append(content);
                    $('#system-modal').modal({ keyboard: false, backdrop: 'static' });
                }
            }
        });
    });
    $(document).on('submit', '#update-person-form', function (evt) {
        evt.preventDefault();

        //set person informatino
        var updatePerson = {
            PersonId: $('#PersonId').val(),
            FirstName: $('#FirstName').val(),
            LastName: $('#LastName').val(),
            BirthDate: $('#BirthDate').val()
        };


        //grab target
        var target = $('#acme-append');
        target.empty().html();

        //send by ajax
        $.ajax({
            url: '/api/person/',
            type: 'put',
            data: JSON.stringify(updatePerson),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            success: function (flag) {
                console.log(flag);
                if (flag === true) {
                    var content = '<div class="row" style="margin-left:auto; margin-right:auto;">';
                    content += '<div class="col-xs-12"><div class="text-center h4">';
                    content += '<img src="/Content/landscapes/like.png" style="display:block; margin-left:auto; margin-right:auto;width:150px; height:150px;" class="img-responsive"/><br/>';
                    content += 'Person has been updated sucessfully"<br/>';
                    content += ' <button id="btn-manage-person" class="btn btn-danger submit-btn">Manage people</button>';
                    content += '</div></div></div>';

                    //append the content to the target
                    target.append(content);
                    $('#system-modal').modal({ keyboard: false, backdrop: 'static' });
                } else {
                    var content = '<div class="row" style="margin-left:auto; margin-right:auto;">';
                    content += '<div class="col-xs-12"><div style="color:red" class="text-center h4">';
                    content += 'Sorry something went wrong we could not update this person, please try again later<br/>';
                    content += '<a href="/Home/Index" id="btn-home" class="btn btn-default" style="background-color:#fff; color:#ff006e; border:1px solid #ff006e; border-radius:1px;">Ok, show me something</button>';
                    content += '</div></div></div>';

                    //append to target
                    target.append(content);
                    $('#system-modal').modal({ keyboard: false, backdrop: 'static' });
                }
            }
        });
    });

    //view full information of the person (/api/person/{id})
    $(document).on('click', '.person-view-form', function (evt) {
        evt.preventDefault();

        var $form = $(this);
        var $id = $form.find('input[type="hidden"]').val();
        console.log($id);

        //set to append the content
        var target = $('#acme-append');
        target.empty().html();


        //open connection and get one person
        $.ajax({
            url: '/api/person/' + $id,
            type: 'Get',
            dataType: 'json',
            cache: false,
            success: function (person) {
                console.log(person);
                if (person !== null) {
                    //set content to be appended
                    var content = '<div style="width:90%; margin-left:auto; margin-right:auto;" class="row">';
                    content += '<div class="col-xs-12">';
                    content += '<div class="text-left h5" style="border:1px solid red; padding:10px; color:red;">';
                    content += '<strong>Note:</strong> Deleting this user will remove everything about him/her and the employees relating to this users will be deleted also.'
                    content += '</div><div>'
                    content += '<input type="hidden" id="hidden-for-employee-add" value="'+person.PersonId+'" />';
                    content += '<div class="col-xs-12 col-sm-6">';
                    content += 'Name';
                    content += '</div>';
                    content += '<div class="col-xs-12 col-sm-6">';
                    content += person.FirstName;
                    content += '</div>';
                    content += '<div class="col-xs-12 col-sm-6">';
                    content += 'Last Name';
                    content += '</div>';
                    content += '<div class="col-xs-12 col-sm-6">';
                    content += person.LastName;
                    content += '</div>';
                    content += '<div class="col-xs-12 col-sm-6">';
                    content += 'Birth Date';
                    content += '</div>';
                    content += '<div class="col-xs-12 col-sm-6">';
                    content += moment(person.BirthDate).format("DD-MM-YYYY");
                    content += '</div>';
                    content += '<div class="col-xs-12"><div class="text-center"><button type="button" id="btn-another-employee" style="background-color: #ff006e; border-radius:2px; border:1px solid #ff006e; color:#fff;"  class="btn btn-danger">click to add more employees</button> <button id="btn-manage-person" style="border-radius:1px;" class="btn btn-primary">manage people</button> <button id="btn-delete-person" style="border-radius:2px;" class="btn btn-danger">delete this person</button></div></div><br/>';
                    
                    if (person.Employees.length > 0) {
                        content += '<div style="margin-top:10px;" class="col-xs-12"><div class="text-left h4" style="margin-top:10px;">This person has the following employees  </div></div><br/>';
                        content += '<table class="table"';
                        //content += '<tr><td>Employee Id</td><td>Employee No#</td><td>Employed date</td><td>Terminated Date</td></tr>';
                        $.each(person.Employees, function (i, v) {
                            content += '<tr>';
                            content += '<td>' + v.EmployeeId + '</li>';
                            content += '<td>' + v.EmployeeNum + '</li>';
                            content += '<td colspan="2">Employed: ' +moment( v.EmployedDate).format("DD-MM-YYYY") + '</li>';
                            if (v.TerminatedDate == null) {
                                content += '<td colspan="2">Not-Terminated</td>'
                            } else {
                                content += '<td colspan="2"> Terminated: ' + moment(v.TerminatedDate).format("DD-MM-YYYY") + '</li>';
                            }
                            content += '<td>';
                            content += '<form role="form" class="employee-view-form" name="employee-view-form">';
                            content += '<input type="hidden" id="hidden-' + v.EmployeeId + '" name="hidden-' + v.EmployeeID + '" value="' + v.EmployeeId + '" />';
                            content += '<input type="submit" class="btn btn-default" style="border:1px solid #ff006e; background-color:#fff; color:#ff006e;" value="Modify" />';
                            content += '</form>';
                            content += '</td>';
                            content += '</tr>'
                        });
                        content += '</table>';
                    } else {
                        content += '<div class="row">';
                        content += '<div class="col-xs-12"><div class="text-center h5"> This person has no employees<br/><br/><button type="button" id="btn-add-employee" style="background-color:#fff; border-radius:2px; border:1px solid #ff006e; color:#ff006e;"  class="btn btn-danger">Add employees</button></div></div>';
                        content += '</div></div>';
                    }

                    target.append(content);
                    $('#system-modal').modal({ keyboard: false, backdrop: 'static' });

                } else {
                    var content = '<div class="row">';
                    content += '<div class="col-xs-12">';
                    content += '<div class="text-left h3"> We could not find this user, click manage to try again<br/>';
                    content += '<button type="button" id="btn-view-manage" class="btn btn-danger submit-btn">Manage people</button>';
                    content += '</div>';
                    content += '</div>';
                    content += '</div>';

                    //set the target
                    target.append(content);
                    $('#system-modal').modal({ keyboard: false, backdrop: 'static' });
                }
            }
        })
    });

    //show form to add the employee for the person
    $(document).on('click', '#btn-add-employee', function (evt) {
        evt.preventDefault();

        //grab person id before we do a DOM clean up
        var $person_id = $(document).find('input#hidden-for-employee-add').val();

        //set target
        var target = $('#acme-append');
        target.empty().html();

        //set content but not form content
        var content = '<div style="width:90%;margin-left:auto; margin-right:auto;" class="row">';
        content += '<div class="col-xs-12">';
        content += '<div class="text-left h5"><span class="fa fa-thumb-tack" aria-hidden="true"></span> The employee is tied to a person, if we delete that person then we delete all his/her employees.</div>';
        content += '</div>';

        //set content for the form
        content += '<form role="form" id="add-employee-form" name="add-employee-form">';
        content += '<input type="hidden" value="' + $person_id + '" name="PersonId" id="PersonId"/>';
        content += '<div class="form-group">';
        content += '<label for="EmployedDate">Chose employed date for the employee</label>'
        content += '<input type="date" name="EmployedDate" id="EmployedDate" class="form-control text-control-style"/>';
        content += '</div>';
        content += '<div class="form-group">';
        content += '<label for="EmployeeNum">Enter employee number</label>'
        content += '<input type="text" name="EmployeeNum" id="EmployeeNum" class="form-control text-control-style" placeholder="enter employee number"/>';
        content += '</div>';
        content += '<input type="submit" class="btn btn-danger submit-btn" id="btn-submit-employee" name="btn-submit-employee" value="submit"/>'
        content += ' <input type="reset" class="btn btn-warning orange-btn" id="btn-cancel-employee" name="btn-cancel-employee" value="cancel"/>'
        content += '</form>';
        content += '</div>';

        //apppend the target
        target.append(content);
        $('#system-modal').modal({ keyboard: false, backdrop: 'static' });
    });
    $(document).on('click', '#btn-another-employee', function (evt) {
        evt.preventDefault();

        //grab person id before we do a DOM clean up
        var $person_id = $(document).find('input#hidden-for-employee-add').val();

        //set target
        var target = $('#acme-append');
        target.empty().html();

        //set content but not form content
        var content = '<div style="width:90%;margin-left:auto; margin-right:auto;" class="row">';
        content += '<div class="col-xs-12">';
        content += '<div class="text-left h5"><span class="fa fa-thumb-tack" aria-hidden="true"></span> Please note - The employee number will be generated automatically, you only need to enter/choose the start date of employment.</div>';
        content += '</div>';

        //set content for the form
        content += '<form role="form" id="add-employee-form" name="add-employee-form">';
        content += '<input type="hidden" value="' + $person_id + '" name="PersonId" id="PersonId"/>';
        content += '<div class="form-group">';
        content += '<label for="EmployedDate">Chose employed date for the employee</label>'
        content += '<input type="date" name="EmployedDate" id="EmployedDate" class="form-control text-control-style"/>';
        content += '</div>';
        content += '<div class="form-group">';
        content += '<label for="EmployeeNum">Enter employee number</label>'
        content += '<input type="text" name="EmployeeNum" id="EmployeeNum" class="form-control text-control-style" placeholder="enter employee number"/>';
        content += '</div>';
        content += '<input type="submit" class="btn btn-danger submit-btn" id="btn-submit-employee" name="btn-submit-employee" value="submit"/>'
        content += ' <input type="reset" class="btn btn-warning orange-btn" id="btn-cancel-employee" name="btn-cancel-employee" value="cancel"/>'
        content += '</form>';
        content += '</div>';

        //apppend the target
        target.append(content);
        $('#system-modal').modal({ keyboard: false, backdrop: 'static' });
    });


    //submit the employee form
    $(document).on('submit', '#add-employee-form', function (evt) {
        evt.preventDefault();

        var newEmployee = {
            EmployedDate: $('#EmployedDate').val(),
            PersonId: $('#PersonId').val(),
            EmployeeNum:$('#EmployeeNum').val()
        };


        //grab the target in the DOM
        var target = $('#acme-append');
        target.empty().html();

        //send by ajax connection
        $.ajax({
            url: '/api/employee/',
            type: 'post',
            data: JSON.stringify(newEmployee),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            success: function (flag) {
                console.log(flag);
                if (flag === true) {
                    var content = '<div class="row" style="margin-left:auto; margin-right:auto;">';
                    content += '<div class="col-xs-12"><div class="text-center h4">';
                    content += '<img src="/Content/landscapes/like.png" style="display:block; margin-left:auto; margin-right:auto;width:150px; height:150px;" class="img-responsive"/><br/>';
                    content += 'New employee added to the database, manage more person -> employees by clicking "Manage people"<br/>';
                    content += '<button id="btn-another-person" class="btn btn-default" style="background-color:#fff; color:#ff006e; border:1px solid #ff006e; border-radius:1px;">Add more people</button>';
                    content += ' <button id="btn-manage-person" class="btn btn-danger submit-btn">Manage people</button>';
                    content += '</div></div></div>';

                    //append the content to the target
                    target.append(content);
                    $('#system-modal').modal({ keyboard: false, backdrop: 'static' });
                } else {
                    var content = '<div class="row" style="margin-left:auto; margin-right:auto;">';
                    content += '<div class="col-xs-12"><div style="color:red" class="text-center h4">';
                    content += 'Sorry something went wrong we could not add this person, please try again later<br/>';
                    content += '<a href="/Home/Index" id="btn-home" class="btn btn-default" style="background-color:#fff; color:#ff006e; border:1px solid #ff006e; border-radius:1px;">Ok, show me something</button>';
                    content += '</div></div></div>';

                    //append to target
                    target.append(content);
                    $('#system-modal').modal({ keyboard: false, backdrop: 'static' });
                }
            }
        });
    });
    
    //prepare to update employee
    $(document).on('submit', '.employee-view-form', function (evt) {
        evt.preventDefault();

        //grab the the id and form context
        var $form = $(this);
        var $id = $form.find('input[type="hidden"]').val();

        //set target
        var target = $('#acme-append');
        target.empty().html();

        //send via ajax to get one one employee for update
        $.ajax({
            url: '/api/employee/' + $id,
            type: 'get',
            dataType: 'json',
            cache: false,
            success: function (employee) {
                
                if (employee !== null) {
                    var content = '<div class="row" style="width:95%;margin-left:auto; margin-right:auto;>"';
                    content += '<div class="col-xs-12"><div class="text-left h4" style="padding:10px;">Update this Employee</div></div>';
                    content += '<form role="form" name="update-employee-form" id="update-employee-form"> ';
                    content += '<input type="hidden" name="EmployeeId" id="EmployeeId" value="' + employee.EmployeeId + '" />';
                    content += '<input type="hidden" name="PersonId" id="PersonId" value="' + employee.PersonId + '" />';
                    content += '<div class="form-group">';
                    content += '<label for="EmployeeNum">Enter employee number</label>';
                    content += '<input type="text" name="EmployeeNum" id="EmployeeNum" class="form-control text-control-style" placeholder="enter last name here" value="' + employee.EmployeeNum + '" />';
                    content += '</div>';
                    //content += '<div class="form-group">';
                    //content += '<label for="EmployedDate">Enter/choose employeed date</label>';
                    //content += '<input type="date" name="EmployedDate" id="EmployedDate" class="form-control text-control-style" placeholder="enter last name here" value="' + employee.EmployedDate + '" />';
                    //content += '</div>';
                    content += '<div class="form-group">';
                    content += '<label for="TerminatedDate">choose / add terminated date</label>';
                    content += '<input type="date" name="TerminatedDate" id="TerminatedDate" class="form-control text-control-style" placeholder="enter last name here" value="' + employee.TerminatedDate + '" />';
                    content += '</div>';
                    content += '<input type="submit" class="btn btn-danger submit-btn" id="btn-submit-employee-update" name="btn-submit-employee-uopdate" value="submit"/>'
                    content += ' <input type="reset" class="btn btn-warning orange-btn" id="btn-cancel-employee-update" name="btn-cancel-employee-update" value="cancel"/>'
                    content += '</form>';

                    //append the target
                    target.append(content);
                    $('#system-modal').modal({ keyboard: false, backdrop: 'static' });

                } else {
                    var content = '<div class="row" style="margin-left:auto; margin-right:auto;">';
                    content += '<div class="col-xs-12"><div style="color:red" class="text-center h4">';
                    content += 'Sorry we could not find employee information <br/>';
                    content += '<a href="/Home/Index" id="btn-home" class="btn btn-default" style="background-color:#fff; color:#ff006e; border:1px solid #ff006e; border-radius:1px;">Ok, show me something</button>';
                    content += '</div></div></div>';

                    //append to target
                    target.append(content);
                    $('#system-modal').modal({ keyboard: false, backdrop: 'static' });
                }
            }
        });
    });

    //update some employee
    $(document).on('submit', '#update-employee-form', function (evt) {
        evt.preventDefault();

        //set information before DOM Manipulation
        var updateEmployee = {
            EmployeeId: $('#EmployeeId').val(),
            PersonId: $('#PersonId').val(),
            EmployeeNum: $('#EmployeeNum').val(),
            EmployedDate: $('#EmployedDate').val(),
            TerminatedDate: $('#TerminatedDate').val()

        };

        //grab target
        var target = $('#acme-append');
        target.empty().html();

        //send by ajax
        $.ajax({
            url: '/api/employee/',
            type: 'Put',
            data: JSON.stringify(updateEmployee),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            cache: false,
            success: function (flag) {
                console.log(flag);
                if (flag === true) {
                    var content = '<div class="row" style="margin-left:auto; margin-right:auto;">';
                    content += '<div class="col-xs-12"><div class="text-center h4">';
                    content += '<img src="/Content/landscapes/like.png" style="display:block; margin-left:auto; margin-right:auto;width:150px; height:150px;" class="img-responsive"/><br/>';
                    content += 'Employee has been updated sucessfully"<br/>';
                    content += ' <button id="btn-manage-person" class="btn btn-danger submit-btn">Manage people</button>';
                    content += '</div></div></div>';

                    //append the content to the target
                    target.append(content);
                    $('#system-modal').modal({ keyboard: false, backdrop: 'static' });
                } else {
                    var content = '<div class="row" style="margin-left:auto; margin-right:auto;">';
                    content += '<div class="col-xs-12"><div style="color:red" class="text-center h4">';
                    content += 'Sorry something went wrong we could not update this employee, please try again later<br/>';
                    content += '<a href="/Home/Index" id="btn-home" class="btn btn-default" style="background-color:#fff; color:#ff006e; border:1px solid #ff006e; border-radius:1px;">Ok, show me something</button>';
                    content += '</div></div></div>';

                    //append to target
                    target.append(content);
                    $('#system-modal').modal({ keyboard: false, backdrop: 'static' });
                }
            }
        });

    });

    //delte the person and all it's information
    $(document).on('click', '#btn-delete-person', function (evt) {
        evt.preventDefault();

        //grab the person id before delete and DOM ;manupulation
        var $id = $('input#hidden-for-employee-add').val();

        var target = $('#acme-append');
        target.empty().html();

        //add send via ajax
        $.ajax({
            url: '/api/person/' + $id,
            type: 'delete',
            dataType: 'json',
            cache: false,
            success: function (flag) {
                console.log(flag);
                if (flag === true) {
                    var content = '<div class="row" style="margin-left:auto; margin-right:auto;">';
                    content += '<div class="col-xs-12"><div class="text-center h4">';
                    content += '<img src="/Content/landscapes/like.png" style="display:block; margin-left:auto; margin-right:auto;width:150px; height:150px;" class="img-responsive"/><br/>';
                    content += 'A person has sucessfully delete from the system, please proceed further with options.<br/>';
                    content += ' <button id="btn-manage-person" class="btn btn-danger submit-btn">Manage people</button>';
                    content += '</div></div></div>';

                    //append the content to the target
                    target.append(content);
                    $('#system-modal').modal({ keyboard: false, backdrop: 'static' });
                } else {
                    var content = '<div class="row" style="margin-left:auto; margin-right:auto;">';
                    content += '<div class="col-xs-12"><div style="color:red" class="text-center h4">';
                    content += 'Sorry something went wrong we could not delete this person, please try again later<br/>';
                    content += '<a href="/Home/Index" id="btn-home" class="btn btn-default" style="margin-top:10px; background-color:#fff; color:#ff006e; border:1px solid #ff006e; border-radius:1px;">Ok, show me something</button>';
                    content += '</div></div></div>';

                    //append to target
                    target.append(content);
                    $('#system-modal').modal({ keyboard: false, backdrop: 'static' });
                }
            }
        });
    });
});