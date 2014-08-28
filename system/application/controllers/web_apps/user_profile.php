<?php
include_once 'web_apps_controller.php';
/**
 * user_profile
 *
 * 跟User有關的操作都集中在此處
 *
 * @package		KALS
 * @category		Controllers
 * @author		Pudding Chen <puddingchen.35@gmail.com>
 * @copyright		Copyright (c) 2010, Pudding Chen
 * @license		http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link		http://sites.google.com/site/puddingkals/
 * @version		1.0 2010/8/15 下午 09:21:23
 */

class user_profile extends Web_apps_controller {

    function __construct()
    {
        parent::__construct();

        //檢查是否已經登入，未登入則丟出例外訊息
        login_require();
    }

    function index()
    {
        
    }

    /**
     * 取得照片
     *
     * 不給人直接下載的原因是因為從伺服器端去調整縮放大小、檔案類型比較方便。
     * 
     * @param number|null $id 指定要讀取照片的ID。如果沒有指定，則會使用已登入使用者的ID。如果沒有登入，則會發出錯誤警告。
     */
    function photo($id = NULL) {

        if (is_null($id))
        {
            $user = get_context_user();
            if (isset ($user))
                $id = $user->get_id();

            if (is_null($id))
            {
                handle_error('web_apps.avatar.photo.no_id');    //丟出沒有照片ID的錯誤訊息
                return;
            }
        }

        $dir_path = './user_photo/';
        $photo_path = $dir_path . $id . '.png';

        if (is_file($photo_path) == false)
        {
            handle_error('web_apps.avatar.photo.no_file');    //丟出沒有照片檔案的錯誤訊息
            return;
        }

        //設定header
        header('Content-type: image/png');
        header('Content-Length: ' . filesize($photo_path));
        header(('filename="'.$id.'.png"'));

        $fp = fopen($photo_path, 'r');
        while (!feof($fp))
        {
            // Read a buffer size of the file
            $buffer = fread($fp, $bufferlength);
            $j=0;
            for ($i=0; $i < $bufferlength; $i++) {
                // The key is read in loop to crypt the whole file
                if ($i%$keylength == 0) {
                    $j=0;
                }
                // Apply a xor operation between the key and the file to crypt
                // This operation eats a lots of CPU time (Stream at 1MiB/s on my server; Intel E2180)
                $tmp = pack("C", $key[$j]);
                $bufferE = ( $buffer[$i]^$tmp); // <==== Le fameux XOR

                // Send the encrypted data
                echo $bufferE;
                // Clean the memory
                $bufferE = "";
                $j++;
            }
            $buffer = "";
            flush(); // this is essential for large downloads
            /*
            fclose($fp);
            exit();
            //*/
        }
        // Close the file and it's finished
        fclose($fp);

    }

    function upload_photo($callback = NULL) {

        if (!isset($this->session))
        {
            $this->load->library('session');
        }

        $fileupload = $this->input->post('fileupload');

        $image_library = 'GD2';

        if ($fileupload !== FALSE)
        {
            //開始處理上傳檔案
            $config['upload_path'] = './user_photo/';
            $config['allowed_types'] = 'gif|jpg|png';
            $config['overwrite'] = TRUE;
            $config['encrypt_name'] = TRUE;

            $this->load->library('upload', $config);

            if (!$this->upload->do_upload())
            {
                //如果是上傳失敗的時候
                $error = $this->upload->display_errors();

                $this->_set_upload_photo_session(FALSE, $error);
            }
            else
            {
                //如果上傳成功的時候

                $data = $this->upload->data();
                $file_path = $data['full_path'];

                $user = get_context_user();
                $user_id = $user->get_id();

                $slash_pos = strrpos($file_path, '/');
                $new_file_path = $user_id . '_temp.png';
                if (FALSE !== $slash_pos)
                {
                    $new_file_path = substr($file_path, 0, $slash_pos) . '/' . $new_file_path;
                }

                $config = array(
                    'image_library' => $image_library,
                    'source_image' => $file_path,
                    'new_image' => $new_file_path,
                    'width' => 400,
                    'height' => 400
                );

                $width = $data['image_width'];
                $height = $data['image_height'];
                if ($width > 400 || $height > 400)
                {
                    $config['width'] = 400;
                    $config['height'] = 400;
                }

                $this->load->library('image_lib', $config);
                if ( ! $this->image_lib->resize() )
                {
                    $this->_set_upload_photo_session(FALSE, $this->image_lib->display_errors());
                    return;
                }

                //最後刪除檔案
                if ( !unlink($file_path) )
                {
                    $this->_set_upload_photo_session(FALSE, 'rename_file_failed');
                    return;
                }
                else
                {
                    $this->_set_upload_photo_session(TRUE, TRUE);
                }
            }
        }
        else
        {
            //此處是回報訊息
            $data = $this->_get_upload_photo_session();

            $this->_display_jsonp($data, $callback);
        }

        //儲存session
        context_complete();
    }

    public function edit_photo($json, $callback)
    {
        $data = json_decode($json);

        $user = get_context_user();
        $user_id = $user->get_id();

        $file_path = './user_photo/' . $user_id .'_temp.png';
        $new_file_path = './user_photo/' . $user_id .'.png';

        $image_library = 'GD2';

        if (isset($data->width) && isset($data->height)
            && isset($data->x_axis) && isset($data->y_axis))
        {
            $config = array(
                'image_library' => $image_library,
                'source_image' => $file_path,
                'new_image' => $new_file_path,
                'width' => $data->width,
                'height' => $data->height,
                'x_axis' => $data->x_axis,
                'y_axis' => $data->y_axis,
                'maintain_ratio' => FALSE
            );

            $this->load->library('image_lib', $config);
            if ( ! $this->image_lib->crop() )
            {
                handle_error($this->image_lib->display_errors());
                return;
            }
            else
            {
                //調整大小
                $config = array(
                    'image_library' => $image_library,
                    'source_image' => $new_file_path,
                    'width' => 100,
                    'height' => 100
                );

                $this->image_lib->initialize($config);
                if ( ! $this->image_lib->resize() )
                {
                    handle_error($this->image_lib->display_errors());
                    return;
                }
            }   //if ( ! $this->image_lib->crop() ) else
        }
        else
        {
            //沒有的話，則單純調整大小

            $config = array(
                'image_library' => $image_library,
                'source_image' => $file_path,
                'new_image' => $new_file_path,
                'width' => 100,
                'height' => 100
            );

            $this->load->library('image_lib', $config);
            if ( ! $this->image_lib->resize() )
            {
                handle_error($this->image_lib->display_errors());
                return;
            }
        }

        //刪掉原本的檔案
        unlink($file_path);

        //設定回傳訊息
        $data = TRUE;

        //設定該使用者有照片
        $user->set_photo(TRUE);

        $this->_display_jsonp($data, $callback);
        context_complete();
    }

    public function change_password($json, $callback) {

        $data = json_to_object($json);
        $user = get_context_user();

        $output = FALSE;
        if (isset($user) && isset($data->password))
        {
            $user->set_password($data->password);
            $user->update();

            kals_log($this->db, 11, array('user_id' => $user->get_id()));

            context_complete();
            $output = TRUE;
        }

        $this->_display_jsonp($output, $callback);
    }

    public function update_profile($json, $callback) {

        $data = json_to_object($json);
        $user = get_context_user();

        $output = FALSE;
        if (isset($user))
        {
            $user->set_name($data->name);
            $user->set_locale($data->locale);
            $user->set_sex($data->sex);

            $user->update();

            kals_log($this->db, 10, array('user_id' => $user->get_id(), 'memo'=>array(
                'name' =>$data->name,
                'locale' =>$data->locale,
                'sex'=>$data->sex
            )));
            context_complete();
            $output = TRUE;
        }

        $this->_display_jsonp($output, $callback);

    }
}

/* End of file user_profile.php */
/* Location: ./system/application/controllers/user_profile.php */