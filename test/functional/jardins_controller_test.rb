require 'test_helper'

class JardinsControllerTest < ActionController::TestCase
  setup do
    @jardin = jardins(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:jardins)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create jardin" do
    assert_difference('Jardin.count') do
      post :create, :jardin => @jardin.attributes
    end

    assert_redirected_to jardin_path(assigns(:jardin))
  end

  test "should show jardin" do
    get :show, :id => @jardin.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @jardin.to_param
    assert_response :success
  end

  test "should update jardin" do
    put :update, :id => @jardin.to_param, :jardin => @jardin.attributes
    assert_redirected_to jardin_path(assigns(:jardin))
  end

  test "should destroy jardin" do
    assert_difference('Jardin.count', -1) do
      delete :destroy, :id => @jardin.to_param
    end

    assert_redirected_to jardins_path
  end
end
