"use client";

import React from 'react';
import { Trash2, Mail, Clock, Shield, Phone, MapPin, CheckCircle } from 'lucide-react';

const DataDeletion = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="text-center">
            <Trash2 className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Xóa Dữ Liệu Người Dùng
            </h1>
            <p className="text-gray-600 text-lg">
              Chúng tôi tôn trọng quyền riêng tư của bạn. Nếu bạn muốn xóa dữ liệu cá nhân khỏi ứng dụng của chúng tôi, vui lòng làm theo các bước sau:
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {/* Step 1 */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 rounded-full p-3">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  📧 Bước 1: Gửi yêu cầu xóa dữ liệu
                </h3>
                <p className="text-gray-700 mb-3">
                  Gửi email đến: <span className="font-semibold text-blue-600">support@yourapp.com</span>
                </p>
                <p className="text-gray-700">
                  Tiêu đề: <span className="font-medium">"Yêu cầu xóa dữ liệu cá nhân"</span>
                </p>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 rounded-full p-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  📝 Bước 2: Cung cấp thông tin
                </h3>
                <p className="text-gray-700 mb-3">Trong email, vui lòng bao gồm:</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Email đã đăng ký tài khoản</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Tên Facebook đã sử dụng để đăng nhập</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Lý do muốn xóa dữ liệu (tùy chọn)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
            <div className="flex items-start space-x-4">
              <div className="bg-orange-100 rounded-full p-3">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  ⏰ Bước 3: Chờ xử lý
                </h3>
                <p className="text-gray-700">
                  Chúng tôi sẽ xử lý yêu cầu trong vòng <span className="font-semibold text-orange-600">30 ngày</span> và gửi email xác nhận khi hoàn tất.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-blue-50 rounded-lg shadow-md p-6 mt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Phone className="w-5 h-5 mr-2 text-blue-600" />
            📞 Thông tin liên hệ
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">Email</p>
                <p className="text-blue-600">support@yourapp.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">Hotline</p>
                <p className="text-blue-600">1900-xxxx</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">Địa chỉ</p>
                <p className="text-gray-600">Số xx, Đường ABC, Quận XYZ, TP.HCM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Security Commitment */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8 border-l-4 border-purple-500">
          <div className="flex items-start space-x-4">
            <div className="bg-purple-100 rounded-full p-3">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                🔒 Cam kết bảo mật
              </h3>
              <p className="text-gray-700 mb-3">Sau khi xóa dữ liệu:</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Tất cả thông tin cá nhân sẽ được xóa vĩnh viễn</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Bạn không thể khôi phục lại dữ liệu đã xóa</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Một số dữ liệu có thể được lưu trữ theo yêu cầu pháp lý</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 p-4">
          <p className="text-gray-500 text-sm">
            © 2025 YourApp. Tất cả quyền được bảo lưu. |
            <a href="#" className="text-blue-600 hover:underline ml-1">Chính sách bảo mật</a> |
            <a href="#" className="text-blue-600 hover:underline ml-1">Điều khoản sử dụng</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataDeletion;
