<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $this->title; ?></title>

    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="<?= URL ?>public/assets/favicon.ico">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" />

    <!-- BOX ICONS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css">

    <!-- Core theme CSS (includes Bootstrap) -->
    <link rel="stylesheet" href="<?= URL ?>public/css/main.css">

    <!-- Essentail JS2 for Vue  (All components Styles) -->
    <link href="https://cdn.syncfusion.com/ej2/20.1.55/material.css" rel="stylesheet" type="text/css" />
    <link href="<?= URL ?>public/plugins/essentialui/styles/material.min.css" rel="stylesheet">
    <link href="<?= URL ?>public/plugins/fontawesome-free/css/all.css" rel="stylesheet">
    <link href="<?= URL ?>public/mdb/mdb.min.css" rel="stylesheet">
    <link href="<?= URL ?>public/mdb/css/mdb.min.css" rel="stylesheet">
    <?php if (isset($this->css)) {
        foreach ($this->css as $c) {
            echo ("<link href=\"" . URL . "$c\" rel=\"stylesheet\" type=\"text/css\">\n");
        }
    } ?>

    <!-- Vue library file-->
    <script src="https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.min.js" type="text/javascript"></script>
    <!-- Essential JS 2 for Vue  global script -->
    <script src="https://cdn.syncfusion.com/ej2/20.1.55/ej2-vue-es5/dist/ej2-vue.min.js" type="text/javascript"></script>
    <script src="<?= URL ?>public/plugins/essentialui/scripts/internationalization/traducaoComponentes.js" type="text/javascript"></script>
    <script src="<?= URL ?>public/plugins/essentialui/scripts/internationalization/currencyData.js" type="text/javascript"></script>
    <script src="<?= URL ?>public/plugins/essentialui/scripts/internationalization/currencies.js" type="text/javascript"></script>
    <script src="<?= URL ?>public/plugins/essentialui/scripts/internationalization/numbers.js" type="text/javascript"></script>
    <script src="<?= URL ?>public/plugins/essentialui/scripts/internationalization/languages.js" type="text/javascript"></script>
    <script src="<?= URL ?>public/plugins/essentialui/scripts/internationalization/timeZoneNames.js" type="text/javascript"></script>
    <script src="<?= URL ?>public/plugins/essentialui/scripts/internationalization/numberingSystems.js" type="text/javascript"></script>
    <script src="<?= URL ?>public/plugins/essentialui/scripts/internationalization/caGregorian.js" type="text/javascript"></script>
    <script src="<?= URL ?>public/plugins/essentialui/scripts/ej2-vue.min.js" type="text/javascript"></script>
    <script src="<?= URL ?>public/plugins/axios/axios.min.js" type="text/javascript"></script>
    <script src="<?= URL ?>public/dist/js/common.js" type="text/javascript"></script>
    <script src="<?= URL ?>public/dist/js/dialogtemplates.js" type="text/javascript"></script>
    <script src="<?= URL ?>public/mdb/js/mdb.min.js"></script>

    <link rel="stylesheet" href="<?= URL; ?>public/MDB/css/mdb.min.css" />
    <link rel="stylesheet" href="<?= URL; ?>public/fontawesome/css/all.min.css" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" />
    <link rel="stylesheet" href="<?= URL; ?>public/css/main.css" />
    <link href="<?= URL ?>public/dist/css/dialogs.css" rel="stylesheet">
    <?php
    if (isset($this->js)) {
        foreach ($this->js as $j) {
            echo ("<script src='" . URL . "$j' type='text/javascript'></script>\n");
        }
    } ?>
</head>

<body>
    <!--========== HEADER ==========-->
    <header class="header">
        <div class="header__container">
            <a href="#" class="header__logo">Sistema de Horas</a>
            <?php if(isset($_SESSION['logado'])) { ?>
                <?php if(isset($_SESSION['NOME'])) { ?>
                    <a href="#" class="header__logo"><?php echo$_SESSION['NOME'] ?></a>
                <?php } }?>

            <div class="header__toggle">
                <i class='bx bx-menu' id="header-toggle"></i>
            </div>
        </div>
    </header>

    <!--========== NAV ==========-->
    <div class="nav" id="navbar" style="padding-left: 20px;">
        <nav class="nav__container">
            <div>
                <a href="<?= URL ?>index" class="nav__link nav__logo">
                    <i class='bx bx-home nav__icon'></i>
                    <span class="nav__logo-name">Início</span>
                </a>

                <div class="nav__list">
                    <div class="nav__items">
                        <h3 class="nav__subtitle">Perfil</h3>

                        <div class="nav__dropdown">
                            <a href="#" class="nav__link">
                                <i class='bx bx-user nav__icon'></i>
                                <span class="nav__name">Opções</span>
                                <i class='bx bx-chevron-down nav__icon nav__dropdown-icon'></i>
                            </a>

                            <div class="nav__dropdown-collapse">
                                <div class="nav__dropdown-content">
                                    <?php if (isset($_SESSION['logado'])) {
                                        if ($_SESSION['TIPO_USUARIO'] == 1 || $_SESSION['TIPO_USUARIO'] == 2) { ?>
                                            <a href="<?= URL ?>cad_usuario" class="nav__dropdown-item">Cadastrar Usuário</a>
                                    <?php }
                                    } ?>
                                    <?php if (isset($_SESSION['logado'])) {
                                        if ($_SESSION['TIPO_USUARIO'] == 1) { ?>
                                            <a href="<?= URL ?>usuario" class="nav__dropdown-item">Tipo Usuário</a>
                                    <?php }
                                    } ?>
                                    <?php if (isset($_SESSION['logado'])) {
                                        if ($_SESSION['TIPO_USUARIO'] == 1 || $_SESSION['TIPO_USUARIO'] == 2 || $_SESSION['TIPO_USUARIO'] == 3 || $_SESSION['TIPO_USUARIO'] == 4) { ?>
                                            <a href="<?= URL ?>alterar_senha" class="nav__dropdown-item">Alterar Senha</a>
                                    <?php }
                                    } ?>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <a href="<?= URL ?>logout" class="nav__link nav__logout">
                <i class='bx bx-log-out nav__icon'></i>
                <span href="<?= URL ?>logout" class="nav__name">Sair</span>
            </a>
        </nav>
    </div>

    <div id="mainLayout"></div>

    <script>
        const mainLayout = new Vue({
            el: '#mainLayout',
            template: `
            <div>
                <AppVue></AppVue>
            </div>
        `,
            data: function() {
                return {}
            },
            methods: {}
        })
    </script>

</body>