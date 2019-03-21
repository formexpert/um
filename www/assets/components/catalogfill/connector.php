<?php
/**
 * Catalogfill Connector
 *
 * @package catalogfill
 */
require_once dirname(dirname(dirname(dirname(__FILE__)))).'/config.core.php';
require_once MODX_CORE_PATH.'config/'.MODX_CONFIG_KEY.'.inc.php';
require_once MODX_CONNECTORS_PATH.'index.php';

$corePath = $modx->getOption('core_path').'components/catalogfill/';

$modx->addPackage('catalogfill',$modx->getOption('core_path').'components/catalogfill/model/');
$modx->lexicon->load('catalogfill:default');

/* handle request */
$modx->request->handleRequest(array(
    'processors_path' => $modx->getOption( 'core_path' ) . 'components/catalogfill/processors/mgr/',
    'location' => ''
));

