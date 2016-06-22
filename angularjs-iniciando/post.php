<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, x-xsrf-token");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");

$post = json_decode(file_get_contents('php://input'));

if($post){

    if($post->delete){
        $ret = delete($post->id);
        if($ret){
            $date['status'] = true;
            $date['msg'] = "Success! ID: {$id}";
            echo json_encode($date);exit;
        }else{
            echo json_encode($post);exit;
        }
    }

    if(isset($post->id)){
        $ret = update($post);
        if($ret){
            $date['status'] = true;
            $date['msg'] = "Success!";
            echo json_encode($date);exit;
        }else{
            echo json_encode($post);exit;
        }
    }else{

        $id = save($post);
        if($id){
            $date['status'] = true;
            $date['msg'] = "Success! ID";
            $date['client'] = find($id);
            echo json_encode($post);exit;
        }else{

            echo json_encode($post);exit;
        }
    }


}

$date = listAll();
$json = json_encode($date);
echo $json;exit;

function conn(){
    $conn = new \PDO("mysql:host=localhost;dbname=test_angular","root","root",array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
    return $conn;
}

function listAll(){
    $db = conn();
    $query = "SELECT * FROM `client` order by `id` DESC";
    $stmt = $db->prepare($query);
    $stmt->execute();
    return $stmt->fetchAll(\PDO::FETCH_ASSOC);
}

function save($data){
    $db = conn();
    $query = "insert into `client` (`name`,`tel`,`address`) values (:name,:tel,:address)";
    $stmt = $db->prepare($query);
    $stmt->bindValue(':name',$data->name);
    $stmt->bindValue(':tel',$data->tel);
    $stmt->bindValue(':address',$data->address);
    $stmt->execute();
    return $db->lastInsertId();

}

function update($data){
    $db = conn();
    $query = "update `client` set `name`=:name,`tel`=:tel,`address`=:address where `id`=:id";
    $stmt = $db->prepare($query);
    $stmt->bindValue(':id',$data->id);
    $stmt->bindValue(':name',$data->name);
    $stmt->bindValue(':tel',$data->tel);
    $stmt->bindValue(':address',$data->address);
    return $stmt->execute();
}

function delete($id){
    $db = conn();
    $query = "delete from `client` where `id`=:id";
    $stmt = $db->prepare($query);
    $stmt->bindValue(':id',$id);
    $stmt->execute();
    return $db->lastInsertId();

}

function find($id){
    $db = conn();
    $query = "select * from `client` where id=:id";
    $stmt = $db->prepare($query);
    $stmt->bindValue(':id',$id);
    $stmt->execute();
    return $stmt->fetch(\PDO::FETCH_ASSOC);
}